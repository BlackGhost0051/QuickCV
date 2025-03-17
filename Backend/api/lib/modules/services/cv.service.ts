import puppeteer from "puppeteer";
import { UserData } from '../models/userdata.model';


class CvService{


    // private cvTemplates = [
    //     (userData: UserData) => `
    //      <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>CV - ${userData.name}</title>
    //         <style>
    //             * {
    //                 margin: 0;
    //                 padding: 0;
    //                 box-sizing: border-box;
    //             }
    //             body {
    //                 width: 210mm;
    //                 height: 297mm;
    //                 background: #1e1e2e;
    //                 color: #ffffff;
    //                 padding: 10mm;
    //                 font-family: 'Arial', sans-serif;
    //             }
    //             h1, h2, h3 {
    //                 color: #82aaff;
    //             }
    //             .logo {
    //                 width: 24px;
    //                 height: 24px;
    //                 vertical-align: middle;
    //                 margin-right: 8px;
    //             }
    //             ul {
    //                 padding: 2mm;
    //                 border-radius: 15px;
    //                 background: #00001b;
    //                 list-style: none;
    //                 margin: 5px 0;
    //             }
    //             li {
    //                 margin: 3px;
    //             }
    //             #block {
    //                 padding: 6mm 0;
    //                 border-bottom: 1px solid #44475a;
    //             }
    //             #title_name {
    //                 font-size: 28px;
    //                 font-weight: bold;
    //                 text-align: center;
    //             }
    //             .contact-info {
    //                 display: flex;
    //                 align-items: center;
    //                 justify-content: center;
    //                 gap: 15px;
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <main>
    //             <h1 id="title_name">${userData.name}</h1>
    //             <h2>${userData.jobTitle}</h2>
    //             <h3 class="contact-info">
    //                 <img src="https://img.icons8.com/?size=25&id=9659&format=png&color=ffffff" alt="Phone">
    //                 ${userData.phone} |
    //                 <img src="https://img.icons8.com/?size=25&id=53388&format=png&color=ffffff" alt="Mail">
    //                 ${userData.email} |
    //                 <img src="https://img.icons8.com/?size=25&id=12599&format=png&color=ffffff">
    //                 <a href="${userData.github}">GitHub</a>
    //             </h3>
    //
    //             <div id="block">
    //                 <h1>About Me</h1>
    //                 <p>${userData.about}</p>
    //             </div>
    //
    //             <div id="block">
    //                 <h1>Education</h1>
    //                 <div><strong>${userData.education.institution}</strong></div>
    //                 <div><strong>Degree:</strong> ${userData.education.degree}</div>
    //                 <div><strong>Status:</strong> ${userData.education.status}</div>
    //             </div>
    //
    //             <div id="block">
    //                 <h1>Skills</h1>
    //                 <h3>Programming Languages</h3>
    //                 <ul>
    //                     ${userData.skills.languages.map(lang => `<li>${lang}</li>`).join('')}
    //                 </ul>
    //                 <h3>Frameworks & Tools</h3>
    //                 <ul>
    //                     ${userData.skills.frameworks.map(framework => `<li>${framework}</li>`).join('')}
    //                 </ul>
    //             </div>
    //
    //             <div id="block">
    //                 <h1>Achievements</h1>
    //                 <p>${userData.achievements}</p>
    //             </div>
    //         </main>
    //     </body>
    //     </html>
    //     `,
    //
    //     (userData: UserData) => `
    //    <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>CV - ${userData.name}</title>
    //         <style>
    //             * {
    //                 margin: 0;
    //                 padding: 0;
    //                 box-sizing: border-box;
    //             }
    //             body {
    //                 width: 210mm;
    //                 height: 297mm;
    //                 background: #f5f5f5;
    //                 color: #333;
    //                 padding: 20mm;
    //                 font-family: 'Arial', sans-serif;
    //                 line-height: 1.6;
    //             }
    //             h1, h2, h3 {
    //                 color: #2c3e50;
    //             }
    //             h1 {
    //                 font-size: 36px;
    //                 margin-bottom: 10px;
    //             }
    //             h2 {
    //                 font-size: 24px;
    //                 margin-bottom: 10px;
    //                 color: #3498db;
    //             }
    //             h3 {
    //                 font-size: 18px;
    //                 margin-bottom: 5px;
    //                 color: #34495e;
    //             }
    //             .header {
    //                 text-align: center;
    //                 margin-bottom: 20px;
    //             }
    //             .contact-info {
    //                 display: flex;
    //                 justify-content: center;
    //                 gap: 20px;
    //                 margin-bottom: 20px;
    //             }
    //             .contact-info a {
    //                 color: #3498db;
    //                 text-decoration: none;
    //             }
    //             .contact-info a:hover {
    //                 text-decoration: underline;
    //             }
    //             .section {
    //                 margin-bottom: 20px;
    //             }
    //             .section ul {
    //                 list-style-type: none;
    //                 padding-left: 20px;
    //             }
    //             .section ul li {
    //                 margin-bottom: 5px;
    //             }
    //             .section ul li::before {
    //                 content: "•";
    //                 color: #3498db;
    //                 display: inline-block;
    //                 width: 1em;
    //                 margin-left: -1em;
    //             }
    //             .skills {
    //                 display: flex;
    //                 gap: 20px;
    //             }
    //             .skills div {
    //                 flex: 1;
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <div class="header">
    //             <h1>${userData.name}</h1>
    //             <h2>${userData.jobTitle}</h2>
    //             <div class="contact-info">
    //                 <span>📞 ${userData.phone}</span>
    //                 <span>✉️ ${userData.email}</span>
    //                 <a href="${userData.github}">🌐 GitHub</a>
    //             </div>
    //         </div>
    //
    //         <div class="section">
    //             <h2>About Me</h2>
    //             <p>${userData.about}</p>
    //         </div>
    //
    //         <div class="section">
    //             <h2>Education</h2>
    //             <div><strong>${userData.education.institution}</strong></div>
    //             <div><strong>Degree:</strong> ${userData.education.degree}</div>
    //             <div><strong>Status:</strong> ${userData.education.status}</div>
    //         </div>
    //
    //         <div class="section">
    //             <h2>Skills</h2>
    //             <div class="skills">
    //                 <div>
    //                     <h3>Programming Languages</h3>
    //                     <ul>
    //                         ${userData.skills.languages.map(lang => `<li>${lang}</li>`).join('')}
    //                     </ul>
    //                 </div>
    //                 <div>
    //                     <h3>Frameworks & Tools</h3>
    //                     <ul>
    //                         ${userData.skills.frameworks.map(framework => `<li>${framework}</li>`).join('')}
    //                     </ul>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div class="section">
    //             <h2>Achievements</h2>
    //             <p>${userData.achievements}</p>
    //         </div>
    //     </body>
    //     </html>
    //     `
    // ];

    private cvTemplates = [
        (userData: UserData) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${userData.name}</title>
    <style>
    
        #cv-template-0 * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        #cv-template-0 {
            width: 210mm;
            height: 297mm;
            background: #1e1e2e;
            color: #ffffff;
            padding: 10mm;
            font-family: 'Arial', sans-serif;
        }
        #cv-template-0 h1, #cv-template-0 h2, #cv-template-0 h3 {
            color: #82aaff;
        }
        #cv-template-0 .logo {
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-right: 8px;
        }
        #cv-template-0 ul {
            padding: 2mm;
            border-radius: 15px;
            background: #00001b;
            list-style: none;
            margin: 5px 0;
        }
        #cv-template-0 li {
            margin: 3px;
        }
        #cv-template-0 #block {
            padding: 6mm 0;
            border-bottom: 1px solid #44475a;
        }
        #cv-template-0 #title_name {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
        }
        #cv-template-0 .contact-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
    </style>

    <main id="cv-template-0">
        <h1 id="title_name">${userData.name}</h1>
        <h2>${userData.jobTitle}</h2>
        <h3 class="contact-info">
            <img src="https://img.icons8.com/?size=25&id=9659&format=png&color=ffffff" alt="Phone">
            ${userData.phone} |
            <img src="https://img.icons8.com/?size=25&id=53388&format=png&color=ffffff" alt="Mail">
            ${userData.email} |
            <img src="https://img.icons8.com/?size=25&id=12599&format=png&color=ffffff">
            <a href="${userData.github}">GitHub</a>
        </h3>

        <div id="block">
            <h1>About Me</h1>
            <p>${userData.about}</p>
        </div>

        <div id="block">
            <h1>Education</h1>
            <div><strong>${userData.education.institution}</strong></div>
            <div><strong>Degree:</strong> ${userData.education.degree}</div>
            <div><strong>Status:</strong> ${userData.education.status}</div>
        </div>

        <div id="block">
            <h1>Skills</h1>
            <h3>Programming Languages</h3>
            <ul>
                ${userData.skills.languages.map(lang => `<li>${lang}</li>`).join('')}
            </ul>
            <h3>Frameworks & Tools</h3>
            <ul>
                ${userData.skills.frameworks.map(framework => `<li>${framework}</li>`).join('')}
            </ul>
        </div>

        <div id="block">
            <h1>Achievements</h1>
            <p>${userData.achievements}</p>
        </div>
    </main>
</body>
</html>
`,
        (userData: UserData) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${userData.name}</title>
    <style>
        #cv-template-1 * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        #cv-template-1 {
            width: 210mm;
            height: 297mm;
            background: #f5f5f5;
            color: #333;
            padding: 10mm;
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
        }
        #cv-template-1 h1, #cv-template-1 h2, #cv-template-1 h3 {
            color: #2c3e50;
        }
        #cv-template-1 h1 {
            font-size: 36px;
            margin-bottom: 10px;
        }
        #cv-template-1 h2 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #3498db;
        }
        #cv-template-1 h3 {
            font-size: 18px;
            margin-bottom: 5px;
            color: #34495e;
        }
        #cv-template-1 .header {
            text-align: center;
            margin-bottom: 20px;
        }
        #cv-template-1 .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        #cv-template-1 .contact-info a {
            color: #3498db;
            text-decoration: none;
        }
        #cv-template-1 .contact-info a:hover {
            text-decoration: underline;
        }
        #cv-template-1 .section {
            margin-bottom: 20px;
        }
        #cv-template-1 .section ul {
            list-style-type: none;
            padding-left: 20px;
        }
        #cv-template-1 .section ul li {
            margin-bottom: 5px;
        }
        #cv-template-1 .section ul li::before {
            content: "•";
            color: #3498db;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }
        #cv-template-1 .skills {
            display: flex;
            gap: 20px;
        }
        #cv-template-1 .skills div {
            flex: 1;
        }
    </style>
</head>
<body>
    <div id="cv-template-1">
        <div class="header">
            <h1>${userData.name}</h1>
            <h2>${userData.jobTitle}</h2>
            <div class="contact-info">
                <span>📞 ${userData.phone}</span>
                <span>✉️ ${userData.email}</span>
                <a href="${userData.github}">🌐 GitHub</a>
            </div>
        </div>
    
        <div class="section">
            <h2>About Me</h2>
            <p>${userData.about}</p>
        </div>
    
        <div class="section">
            <h2>Education</h2>
            <div><strong>${userData.education.institution}</strong></div>
            <div><strong>Degree:</strong> ${userData.education.degree}</div>
            <div><strong>Status:</strong> ${userData.education.status}</div>
        </div>
    
        <div class="section">
            <h2>Skills</h2>
            <div class="skills">
                <div>
                    <h3>Programming Languages</h3>
                    <ul>
                        ${userData.skills.languages.map(lang => `<li>${lang}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3>Frameworks & Tools</h3>
                    <ul>
                        ${userData.skills.frameworks.map(framework => `<li>${framework}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    
        <div class="section">
            <h2>Achievements</h2>
            <p>${userData.achievements}</p>
        </div>
    </div>
</body>
</html>
`

    ];


    generateCVHTML(userData: UserData, id: number) {
        if (id < 0 || id >= this.cvTemplates.length) {
            id = 0;
        }
        return this.cvTemplates[id](userData);
    }

    getAllForms(){
        const sampleUserData: UserData = {
            name: "Sample Name",
            jobTitle: "Sample Job Title",
            phone: "+00 000 000 000",
            email: "sample@example.com",
            github: "/generator",
            about: "This is a sample about section.",
            education: {
                institution: "Sample University",
                degree: "Sample Degree",
                status: "Completed"
            },
            skills: {
                languages: ["JavaScript", "TypeScript", "Python"],
                frameworks: ["React", "Node.js", "Django"]
            },
            achievements: "Sample achievement."
        };

        return {
            templates: this.cvTemplates.map((template, index) => ({
                id: index,
                html: template(sampleUserData)
            }))
        };
    }

    async generateCVPDF(userData: UserData, id: number): Promise<Uint8Array> {
        try {
            const html = this.generateCVHTML(userData, id);

            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(html, {
                waitUntil: 'networkidle0'
            });

            const pdfUint8Array = await page.pdf({
                format: 'A4',
                printBackground: true
            });

            await browser.close();

            return pdfUint8Array;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw new Error('Failed to generate PDF');
        }
    }

}


export default CvService;





// EXAMPLE DATA

// {
//     "userData": {
//     "name": "John Doe",
//         "jobTitle": "Software Engineer",
//         "phone": "+88 888 888 888",
//         "email": "john.doe@example.com",
//         "github": "https://github.com/johndoe",
//         "about": "I am a third-year Computer Science student with a passion for web development.",
//         "education": {
//         "institution": "State University",
//             "degree": "Bachelor of Science in Computer Science",
//             "status": "Currently student"
//     },
//     "skills": {
//         "languages": ["HTML", "CSS", "JavaScript", "Python"],
//             "frameworks": ["Express", "Node.js", "Flask"]
//     },
//     "achievements": "Won first place in a local hackathon."
// },
//     "formId": 1
// }
