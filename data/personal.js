module.exports = {
    personal:{
        firstName:"FAİK",
        lastName:"AKTAŞ",
        fullName:"FAİK AKTAŞ",
        title:"Backend Developer",
        location:"TURKEY",
        profileImage:"/images/profile.jpg",

        //İletişim Bilgileri    
        email:"faikaktss06@gmail.com",
        phone:"+90 (551) 232 7894",

        //Sosyal Medya
        social: {
            github:"https://github.com/faikaktss",
            linkedin:"https://linkedin.com/in/faik-aktss",
            instagram:"https://instagram.com/faikaktss",
        },
    },  


        //TODO Profil fotoğrafı eklemeyi unutma

        hero: {
            greeting:"Merhaba ben",
            highlightName:"FAİK AKTAŞ",
            title:"Backend Developer",
            description:["Kendini sürekli geliştirmeyi hedefleyen, yenilikçi çözümler üreten bir backend geliştiriciyim. Modern teknolojilerle ölçeklenebilir ve güvenilir sistemler kurarak, kullanıcı deneyimini en üst seviyeye çıkarmayı amaçlıyorum.",
            ],
        },  


        about:{
            title:"Hakkımda",
            paragraphs:[
                "Bilgisayar Mühendisliği 3. sınıf öğrencisiyim ve Pepteam Bilişim A.Ş.’de part-time yazılım geliştirici olarak çalışıyorum. Geçtiğimiz yıl Onlys’te ileri seviye backend eğitimi alarak kendimi bu alanda derinleştirdim.",
            
                "Öğrencilik hayatım boyunca hedefim; modern teknolojileri öğrenerek, gerçek projelerde aktif görev almak ve mezun olmadan güçlü bir deneyim kazanmak.",
            
                "Sürekli gelişime odaklanan bir bakış açısıyla, hem akademik hem de profesyonel alanda kendimi en iyi şekilde geliştirmeyi amaçlıyorum."
            ],

            education:[
                {
                    degree:"Yazılım Mühendisliği",
                    school:"Manisa Celal Bayar Üniversitesi",
                    year:"2023-2024",
                    gpa:"3.35"
                },
                {
                    degree:"Bilgisayar Mühendisliği",
                    school:"Bülent ecevit üniversitesi",
                    year:"2024-2027",
                    gpa:"3.23"
                }
            ],
        },



    skills: {
        backend: [
            { name: "Node.js", level: 90 },
            { name: "Express.js", level: 95 },
            { name: "NestJS", level: 75 },
            { name: "TypeScript",level:80},
            { name: "REST API", level: 90 },
            { name: "GraphQL", level: 70 },
            { name: "Microservices", level: 65 },
            { name: "Java", level: 60 },
            { name: "Python", level: 50 }
        ],
        
        database: [
            { name: "MongoDB", level: 85 },
            { name: "PostgreSQL", level: 80 },
            { name: "MySQL", level: 75 },
            { name: "Redis", level: 70 },
            { name: "Prisma", level: 85 },
            { name: "Firebase", level:60}
        ],
        
        tools: [
            { name: "Docker", level: 75 },
            { name: "AWS", level: 65 },
            { name: "Git", level: 95 },
            { name: "Jest", level: 80 },
            { name: "Postman", level: 90 },
            { name: "Linux", level: 70 }
        ],
        
        frontend: [
            { name: "JavaScript", level: 85 },
            { name: "Bootstrap", level: 75 },
            { name: "React", level: 70 },
            { name: "HTML/CSS", level: 80 },
            { name: "EJS", level: 85 }
        ]
    },



        experience: [
        {
            position: "Backend Developer (Part-time)", 
            company: "Pepteam Bilişim A.Ş.", 
            period: "2025 Haziran - Devam ediyor",
            location: "Ankara, Türkiye",
            description: [
                "Node.js ve Express ile RESTful API geliştirme",
                "MongoDB , PostgreSQL ve FireBase veritabanı tasarımı",
                "AWS üzerinde deployment ve DevOps süreçleri",
                "Mikroservis mimarisi ve containerization"
            ]
        },

        {
            position:"Backend Developer",
            company:"Onlyjs ",
            period:"2024 Ağustos- 2025 Haziran",
            location:"İstanbul ,Türkiye",
            description:[
                "Nodejs , TypeScript ve NestJs dilleriye projeler geliştirdim ",
                "Temel olarakta HTML Css Javascript Bootstrap eğitimi aldım",
                "PostgreSQL ,Prisma orm , veritabanlarını kullandım",
                "Postman , Docker , AWS  ve Git araçlarını kullandım",
                "Kendimizi geliştirmek için gördüğümüz konularla alakalı ileri seviye projeler geliştirdim",
                "bitirme projesiyle 1 yıl süren ileri seviye backend eğitimimi tamamladım"
            ]
        }
    ],

        site: {
        title: "FAİK AKTAŞ | Backend Developer Portfolio",
        description: "Node.js uzmanı backend developer. Performans odaklı web uygulamaları ve API geliştirme.",
        keywords: "backend developer, nodejs, express, api development, mongodb, postgresql",
        author: "FAİK AKTAŞ",
        url: "https://faikaktas.dev", // Domain aldığında
        
        // SEO
        ogImage: "/images/og-image.jpg", // Sosyal medya paylaşım resmi
        favicon: "/images/favicon.ico"
    }
}