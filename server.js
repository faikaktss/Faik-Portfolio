const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const personal = require('./data/personal').personal;
const GitHubService = require('./services/githubService');
const { site } = require('./data/personal');
const data = require('./data/personal');
const githubUsername = personal.social.github.split('/').pop();
const githubService = new GitHubService(githubUsername);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        // GitHub API'ye bağlanmayı dene, yoksa varsayılan değerler kullan
        let userInfo = null;
        let featureRepos = [];
        let stats = null;
        
        try {
            [userInfo, featureRepos, stats] = await Promise.all([
                githubService.getUserInfo(),
                githubService.getFeatureRepositories(6),
                githubService.getStats(),
            ]);
        } catch (githubError) {
            console.warn('GitHub API hatası, varsayılan değerler kullanılıyor:', githubError.message);
            // Varsayılan değerler
            userInfo = {
                name: personal.fullName,
                bio: personal.title,
                avatar_url: personal.profileImage,
                location: personal.location
            };
            featureRepos = [];
            stats = { totalRepos: 0, totalStars: 0, totalForks: 0 };
        }
        
        res.render('index', {
            title: personal.fullName + ' | ' + personal.title,
            data,
            personal,
            github: userInfo,
            featureRepos,
            stats,
            site: site,
        });
    } catch (error) {
        console.error('Ana sayfa yüklenemedi:', error);
        res.status(500).render('partials/error', {
            message: 'Ana sayfa yüklenirken bir hata oluştu.',
            error: error.message,
            stack: error.stack,
        });
    }
});

app.get('/about', (req, res) => {
    try {
        res.render('about', {
            title: 'Hakkımda | ' + personal.fullName,
            personal,
            site: site,
        });
    } catch (error) {
        console.error('Hakkımda sayfası yüklenemedi:', error);
        res.status(500).render('partials/error', {
            message: 'Hakkımda sayfası yüklenirken bir hata oluştu.',
            error: error.message,
            stack: error.stack,
        });
    }
});

app.get('/projects', async (req, res) => {
    try {
        const githubData = await githubService.getAllData();

        const filters = {
            category: req.query.category || 'all',
            sort: req.query.sort || 'updated',
            tech:req.query.tech || ''
        };

        res.render('projects', {
            title: 'Projeler | ' + personal.fullName,
            github: githubData,
            filters: filters,
            personal,
            site: site
        });
    } catch (error) {
        console.error('Projeler sayfası yüklenemedi:', error);
        res.status(500).render('partials/error', {
            message: 'Projeler sayfası yüklenirken bir hata oluştu.',
            error: error.message,
            stack: error.stack
        });
    }
});

app.get('/blog', (req, res) => {
    try {
        res.render('blog', {
            title: 'Blog | ' + personal.fullName,
            personal,
            site:site
        });
    } catch (error) {
        console.error('Blog sayfası yüklenemedi:', error);
        res.status(500).render('partials/error', {
            message: 'Blog sayfası yüklenirken bir hata oluştu.',
            error: error.message,
            stack: error.stack,
        });
    }
});

app.get('/contact', (req, res) => {
    try {
        res.render('contact', {
            title: 'İletişim | ' + personal.fullName,
            personal,
            site:site
        });
    } catch (error) {
        console.error('İletişim sayfası yüklenemedi:', error);
        res.status(500).render('partials/error', {
            message: 'İletişim sayfası yüklenirken bir hata oluştu.',
            error: error.message,
            stack: error.stack,
        });
    }
});

app.use((req, res) => {
    res.status(404).render('partials/error', {
        message: 'Aradığınız sayfa bulunamadı.',
        error: '404 Not Found',
        stack: '',
    });
});

app.use((err, req, res, next) => {
    console.error('Genel sunucu hatası:', err);
    res.status(500).render('partials/error', {
        message: 'Sunucuda beklenmeyen bir hata oluştu.',
        error: err.message,
        stack: err.stack,
    });
});

// Vercel için export
module.exports = app;

// Lokal development için
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
