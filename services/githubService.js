const { create } = require("domain");
const https = require("https");
const { json } = require("stream/consumers");

class GitHubService {
  constructor(username) {
    this.username = username;
    this.baseURL = "https://api.github.com";
    this.cache = {
      repos: null,
      user: null,
      lastFetch: null,
      cacheDuration: 10 * 60 * 1000,
    };
  }

  async fetchFromAPI(endpoint) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "api.github.com",
        path: endpoint,
        method: "GET",
        headers: {
          "User-Agent": "Portfolio-Website",
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`
          })
        },
      };

      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            console.log('API Response Status: ', res.statusCode);
            console.log('API Response Headers: ',res.headers);
            console.log('API Response Body ',data.slice(0,200));

            const jsonData = JSON.parse(data);

            if (res.statusCode === 200) resolve(jsonData);
            else
              reject(
                new Error(
                  `Github API Error: ${res.statusCode} - ${jsonData.message}`
                )
              );
          } catch (error) {
            reject(new Error("JSON Parse Error: " + error.message));
          }
        });
      });

      req.on("error", (error) => {
        reject(new Error("Request Error: " + error.message));
      });

      req.end();
    });
  }

  //Cache Kontrolu
  isCacheValid() {
    if (!this.cache.lastFetch || !this.cache.repos) return false;

    const now = Date.now();
    return now - this.cache.lastFetch < this.cache.cacheDuration;
  }

  //Kullanıcı bilgilerini çekiyoruz
  async getUserInfo() {
    try {
      if (this.cache.user && this.isCacheValid()) return this.cache.user;

      console.log("Github bilgileri çekiliyor");
      const userData = await this.fetchFromAPI(`/users/${this.username}`);

      this.cache.user = {
        name: userData.name || this.username,
        bio: userData.bio,
        location: userData.location,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        avatarUrl: userData.avatar_url,
        htmlUrl: userData.html_url, 
        createdAt: userData.created_at, 
      };

      return this.cache.user;
    } catch (error) {
      console.error("Github user bilgisi alınamadı" + error.message);
      return null;
    }
  }

  //Repoları Çekelim
  async getRepositories() {
    try {
      if (this.cache.repos && this.isCacheValid()) return this.cache.repos;

      console.log("Github verileri çekiliyor");
      const reposData = await this.fetchFromAPI(
        `/users/${this.username}/repos?sort=update&per_page=50`
      );

      const filteredRepos = reposData
        .filter((repo) => {
          return (
            !repo.fork &&
            !repo.archived &&
            repo.size > 0 &&
            !["config", "dotfiles", ".github"].some((exclude) =>
              repo.name.toLowerCase().includes(exclude)
            )
          );
        })
        .map((repo) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description || "Açıklama eklenmemiş",
          htmlUrl: repo.html_url,
          homepageUrl: repo.homepage,
          language: repo.language,
          stargazersCount: repo.stargazers_count,
          forksCount: repo.forks_count,
          size: repo.size,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          pushedAt: repo.pushed_at,
          topics: repo.topics || [],
          techStack: this.generateTechStack(repo),
          category: this.categorizeRepository(repo),
        }))
        .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))
        .slice(0, 12);

      this.cache.repos = filteredRepos;
      this.cache.lastFetch = Date.now();

      console.log(
        `${filteredRepos.length} repository güzel bir şekilde yüklendi`
      );
      return filteredRepos;
    } catch (error) {
      console.error("Github repositories alınamadı", error.message);
      if (this.cache.repos) {
        console.log("Cache den eski veriler kullanılıyor");
        return this.cache.repos;
      }

      return [];
    }
  }

  //Teknoloj, stack'i belirle
  generateTechStack(repo) {
    const techStack = [];

    if (repo.language) techStack.push(repo.language);

    if (repo.topics && repo.topics.length > 0) {
      const techTopics = repo.topics.filter((topic) =>
        [
          "javascript",
          "typescript",
          "react",
          "nodejs",
          "express",
          "mongodb",
          "postgresql",
          "docker",
          "aws",
          "nextjs",
          "vue",
          "python",
          "django",
          "flask",
          "mysql",
          "redis",
        ].includes(topic.toLowerCase())
      );
      techStack.push(...techTopics);
    }

    const repoName = repo.name.toLowerCase();
    if (repoName.includes("react")) techStack.push("React");
    if (repoName.includes("node")) techStack.push("Node.js");
    if (repoName.includes("express")) techStack.push("Express");
    if (repoName.includes("mongo")) techStack.push("MongoDB");
    if (repoName.includes("next")) techStack.push("Next.js");

    return [...new Set(techStack)].slice(0, 4);
  }

  //Repository kategorisini belirle
  categorizeRepository(repo) {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || "").toLowerCase();
    const language = (repo.language || "").toLowerCase();

    if (
      language === "javascript" &&
      (name.includes("api") ||
        name.includes("backend") ||
        name.includes("server") ||
        desc.includes("api"))
    ) {
      return "backend";
    }

    if (
      name.includes("react") ||
      name.includes("vue") ||
      name.includes("frontend") ||
      desc.includes("frontend")
    ) {
      return "frontend";
    }

    if (
      name.includes("fullstack") ||
      name.includes("full-stack") ||
      desc.includes("fullstack")
    ) {
      return "fullstack";
    }

    if (
      name.includes("mobile") ||
      name.includes("react-native") ||
      desc.includes("mobile")
    ) {
      return "mobile";
    }

    if (
      name.includes("cli") ||
      name.includes("tool") ||
      desc.includes("tool") ||
      desc.includes("cli")
    ) {
      return "tool";
    }

    switch (language) {
      case "javascript":
      case "typescript":
        return "web";
      case "python":
        return "backend";
      case "java":
        return "backend";
      default:
        return "other";
    }
  }

  async getFeatureRepositories(count = 6) {
    const allRepos = await this.getRepositories();

    return allRepos
      .filter(
        (repo) =>
          repo.stargazersCount > 0 || repo.forksCount > 0 || repo.homepageUrl
      )
      .slice(0, count);
  }

  //İstatistik Hesaplama
  async getStats() {
    try {
      const [userInfo, repos] = await Promise.all([
        this.getUserInfo(),
        this.getRepositories(),
      ]);

      const totalStars = repos.reduce(
        (sum, repo) => sum + repo.stargazersCount,
        0
      );
      const totalForks = repos.reduce((sum, repo) => sum + repo.forksCount, 0);
      const languages = [
        ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
      ];

      return {
        totalRepos: userInfo?.publicRepos || repos.length,
        totalStars,
        totalForks,
        languages: languages.length,
        followers: userInfo?.followers || 0,
        topLanguages: this.getTopLanguages(repos),
        recentActivity: repos.slice(0, 3).map((repo) => ({
          name: repo.name,
          updatedAt: repo.pushedAt,
        })),
      };
    } catch (error) {
      console.error("❌ GitHub stats alınamadı:", error.message);
      return {
        totalRepos: 0,
        totalStars: 0,
        totalForks: 0,
        languages: 0,
        followers: 0,
        topLanguages: [],
        recentActivity: [],
      };
    }
  }

  getTopLanguages(repos) {
    const languageCount = {};

    repos.forEach((repo) => {
      if (repo.language)
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    });

    return Object.entries(languageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([language, count]) => ({ language, count }));
  }

  async  getAllData() {
  try {
    const repositories = await this.getRepositories();
    const stats = await this.getStats();

    const categories = [...new Set(repositories.map(repo => repo.category))];
    const technologies= [...new Set(repositories.flatMap(repo=>repo.techStack))];

    return{
      repositories:repositories,
      repos:repositories,
      categories:categories,
      technologies:technologies,
      stats:stats,
      totalCount:repositories.length
    };
  } catch (error) {
    console.error('github AllData hatası:',error.message);
      return{
        repositories: [],
        repos: [],
        categories:[],
        technologies:[],
        stats:{},
        totalCount:0
      };
  }
}
}
module.exports = GitHubService;