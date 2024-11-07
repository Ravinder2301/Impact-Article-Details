const express = require("express");
const bodyParser = require("body-parser");
// const mysql = require("mysql");
const cors = require("cors");
// const he = require('he')
const publicationController = require('./controllers/publicationController');
const articleController = require('./controllers/articleController');
const additionalKeywordsController = require('./controllers/additionalKeywordsController');

// Create a connection pool
// const connection = mysql.createPool({
//   host: "localhost", 
//   user: "root",
//   password: "impact@12345",
//   database: "impact",
// });

/**************** MySQL Connection *********************/
// const connection = mysql.createPool({
//   host: "192.168.248.4", 
//   user: "adminlaravel",
//   password: "Rix2Jag8",
//   database: "adminproject",
// });
 /****************************************************/

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
app.use(cors());

// Define the POST endpoint
// app.post("/query", async (req, res) => {
//   const { articleID } = req.body;

//   if (!articleID) {
//     return res.status(400).json({ error: "Missing articleID in request body" });
//   }

//   try {
//     const results = await runQuery(articleID);
//     res.status(200).json(results);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/getPublications", async (req, res) => {
//   try {
//     const query = `
//       SELECT pm.Title AS PublicationTitle, pl.Name AS Edition
//       FROM pub_master pm
//            JOIN 
//         picklist pl ON pm.Place = pl.ID
//     `;

//     // Execute the query and get the results
//     const results = await new Promise((resolve, reject) => {
//       connection.query(query, (error, results) => {
//         if (error) {
//           console.log("Database not connected");
//           return reject(error);
//         }
//         console.log("Database connected");
//         resolve(results);
//       });
//     });

//     // Send the results as a JSON response
//     res.status(200).json(results);
//   } catch (error) {
//     console.error("Error fetching publications:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/getArticles", async (req, res) => {
//   try {
//     const { pubdate, pub, edition } = req.body;

//     // Basic validation
//     if (!pubdate || !pub ) {
//       return res.status(400).json({ error: 'Publication date, title, and edition are required' });
//     }

//     // SQL Query using parameterized values
//     const query = `
//       SELECT 
//         sub.PublicationTitle,
//         sub.Edition,
//         sub.pubdate,
//         sub.TotalArticles,
//         ai.Page_Number,
//         COUNT(ai.ArticleID) AS ArticlesOnPage
//       FROM 
//         article a
//       JOIN 
//         pub_master pm ON a.PubID = pm.Pubid
//       JOIN 
//         picklist pl ON pm.Place = pl.ID
//       JOIN 
//         (SELECT 
//            pm.Title AS PublicationTitle, 
//            pl.Name AS Edition, 
//            a.pubdate, 
//            COUNT(a.ArticleID) AS TotalArticles
//          FROM 
//            article a
//          JOIN 
//            pub_master pm ON a.PubID = pm.Pubid
//          JOIN 
//            picklist pl ON pm.Place = pl.ID
//          WHERE 
//            a.pubdate = ?  
//            AND pm.Title = ?  
//            AND pl.Name = ?  
//          GROUP BY 
//            pm.Title, pl.Name, a.pubdate) sub 
//       ON 
//         pm.Title = sub.PublicationTitle 
//         AND pl.Name = sub.Edition 
//         AND a.pubdate = sub.pubdate
//       LEFT JOIN 
//         article_image ai ON a.ArticleID = ai.ArticleID
//       WHERE 
//         a.pubdate = ?  
//         AND pm.Title = ?  
//         AND pl.Name = ?  
//       GROUP BY 
//         sub.PublicationTitle, 
//         sub.Edition, 
//         sub.pubdate, 
//         ai.Page_Number
//       ORDER BY 
//         cast(ai.Page_Number as unsigned);
//     `;

//     // Execute the query with parameterized values
//     const results = await new Promise((resolve, reject) => {
//       connection.query(query, [pubdate, pub, edition, pubdate, pub, edition], (error, results) => {
//         if (error) {
//           console.error('Database query error:', error);  // More detailed logging
//           return reject(error);
//         }
//         resolve(results);
//       });
//     });

//     // Send the results as a JSON response
//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Server error:', error);  // More detailed logging
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post("/getArticlesByPageNo", async (req, res) => {
//   try {
//     const { pubdate, pub, edition, pageNumber } = req.body;

//     // Basic validation
//     if (!pubdate || !pub || !pageNumber ) {
//       return res.status(400).json({ error: 'Publication date, title, and edition are required' });
//     }

//     // SQL Query using parameterized values
//     const query = `
//       SELECT 
//     a.ArticleID,
//     a.Title AS ArticleTitle,
//     ai.Page_Number
// FROM 
//     article a
// JOIN 
//     pub_master pm ON a.PubID = pm.Pubid
// JOIN 
//     picklist pl ON pm.Place = pl.ID  -- Join with picklist to get the edition
// JOIN 
//     article_image ai ON a.ArticleID = ai.ArticleID  -- Join with article_image to get page numbers
// WHERE 
//     a.pubdate = ?  -- Replace with the desired date
//     AND pm.Title = ?  -- Replace with the desired publication title
//     AND pl.Name = ?  -- Replace with the desired edition
//     AND ai.Page_Number = ?;  -- Replace with the desired page number
//     `;

//     // Execute the query with parameterized values
//     const results = await new Promise((resolve, reject) => {
//       connection.query(query, [pubdate, pub, edition, pageNumber], (error, results) => {
//         if (error) {
//           console.error('Database query error:', error);  // More detailed logging
//           return reject(error);
//         }
//         resolve(results);
//       });
//     });

//     // Send the results as a JSON response
//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Server error:', error);  // More detailed logging
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post("/getFullTextById", async (req, res) => {
//   try {
//     const { articleID } = req.body;

//     // Basic validation
//     if (!articleID ) {
//       return res.status(400).json({ error: 'Publication date, title, and edition are required' });
//     }

//     // SQL Query using parameterized values
//     const query = `
//       SELECT 
//     a.ArticleID,
//     a.pubdate,
//     a.PubID,
//     a.Num_pages,
//     a.Title AS ArticleTitle,
//     a.Sub_Title,
//     a.IsColor,               -- IsColor from article table
//     a.IsPhoto,               -- IsPhoto from article table
//     a.UserID,                -- UserID from article table
//     a.IsPremium,             -- IsPremium from article table
//     a.ave,                   -- ave from article table
//     a.lastupdated,           -- lastupdated from article table
//     a.sq_allocatedDateTime,  -- sq_allocatedDateTime from article table
//     a.Date_Time_Acqured,
//     a.md5id,     -- Date_Time_Acqured from article table
//     ai.Page_Number,
//     ai.pagename,             -- Page_Name from article_image table
//     ai.full_text,
//     ai.imagedirectory,
//     ai.Image_name,
//     ai.start_acq_time,
//     ai.end_acq_time,
//     ak.keyid,
//     km.PrimarykeyID,
//     CONCAT(km.KeyWord, 
//            CASE 
//                WHEN km.Filter_String IS NOT NULL AND km.Filter_String != '' 
//                THEN CONCAT(':', km.Filter_String) 
//                ELSE '' 
//            END) AS MergedKeywordFilter, -- Merge Keyword and Filter_String only if Filter_String is not empty
//     pm.Title AS PublicationTitle,
//     s.Name AS SectorName,
//     j.Fname,
//     j.Lname
// FROM 
//     article a
// JOIN 
//     article_image ai ON a.ArticleID = ai.ArticleID
// LEFT JOIN 
//     article_keyword ak ON a.ArticleID = ak.articleid
// LEFT JOIN 
//     keyword_master km ON ak.keyid = km.keyID
// LEFT JOIN 
//     pub_master pm ON a.PubId = pm.PubId
// LEFT JOIN 
//     picklist s ON a.SectorPid = s.ID  -- Join with picklist to get sector name
// LEFT JOIN 
//     article_journalist aj ON a.ArticleID = aj.ArticleID  -- Left join with article_journalist
// LEFT JOIN 
//     journalist j ON aj.JournalistID = j.JourID  -- Left join with journalist
// WHERE 
//     a.ArticleID = ?;
//     `;

//     // Execute the query with parameterized values
//     const results = await new Promise((resolve, reject) => {
//       connection.query(query, articleID, (error, results) => {
//         if (error) {
//           console.error('Database query error:', error);  // More detailed logging
//           return reject(error);
//         }
//         resolve(results);
//       });
//     });
//     function handleSpecialCharacters(text) {
//       // Convert common mis-encoded characters
//       let correctedText = text
//       .replace(/â€¢/g, '•')        // Bullet point
//       .replace(/â€”/g, '—')        // Em dash
//       .replace(/â€“/g, '–')        // En dash
//       .replace(/â€œ/g, '“')        // Left double quotation mark
//       .replace(/â€˜/g, '‘')        // Left single quotation mark
//       .replace(/â€™/g, '’')        // Right single quotation mark
//       .replace(/â€/g, '”')        // Right double quotation mark
//       .replace(/â€¦/g, '…')        // Ellipsis
//       .replace(/Â°/g, '°')         // Degree symbol
//       .replace(/â€“/g, '–')
//       .replace(/â‚¬/g, '€')
//       .replace(/â–\s*/g, '')
//       .replace(/âœ“/g, '') // Convert the specific string to a space
//       .replace(/\* -v/g, '') // Convert "* -v" to a space
//       // .replace(/-(\s*\w+)/g, '$1') // Remove hyphen and add whole word (handle space)
//       // .replace(/-\n/g, '')
//       .replace(/\^/g, '» ')
//       .replace(/â–º/g, '»')
//       .replace(/(\w+)-\s*\n\s*(\w+)/g, '$1$2')
//       .replace(/\*/g, "'")
//       .replace(/ï¿½/g, "'"); 

//       return correctedText;
//     }
    
//     if (results.length > 0 ) {
//       // results[0].full_text = handleSpecialCharacters(results[0].full_text);
//       results.forEach(text => {
//         text.full_text = handleSpecialCharacters(text.full_text)
//         text.ArticleTitle = handleSpecialCharacters(text.ArticleTitle)
//         text.Sub_Title = handleSpecialCharacters(text.Sub_Title)
//       });
//     }
    

//     // Send the results as a JSON response
//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Server error:', error);  // More detailed logging
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/getFilterString', async (req, res) => {
//   try {
//     const { PrimarykeyID } = req.body

//     // if (!PrimarykeyID) {
//     //   return res.status(400).json({ error: 'PrimaryKeyID is required' });
//     // }

//     const query = `SELECT Filter_String, keyid FROM keyword_master where PrimarykeyID = ? `;

//     // Execute the query with parameterized values
//     const results = await new Promise((resolve, reject) => {
//       connection.query(query, PrimarykeyID, (error, results) => {
//         if (error) {
//           console.error('Database query error:', error);  // More detailed logging
//           return reject(error);
//         }
//         resolve(results);
//       });
//     });

//     // Send the results as a JSON response
//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Server error:', error);  // More detailed logging
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })

// app.put('/editArticle', async (req, res) => {
//   try {
//     // const { id } = req.params;
//     const { id, title, sub_title, isPremium, isColor, isPhoto } = req.body;

//     // Build the query dynamically based on which fields are provided
//     let query = 'UPDATE article SET';
//     const params = [];

//     if (title !== undefined) {
//       query += ' Title = ?';
//       params.push(title);
//     }

//     if (sub_title !== undefined) {
//       if (params.length > 0) query += ',';
//       query += ' Sub_Title = ?';
//       params.push(sub_title);
//     }

//     if (isPremium !== undefined) {
//       if (params.length > 0) query += ',';
//       query += ' IsPremium = ?';
//       params.push(isPremium);
//     }

//     if (isPhoto !== undefined) {
//       if (params.length > 0) query += ',';
//       query += ' IsPhoto = ?';
//       params.push(isPhoto);
//     }

//     if (isColor !== undefined) {
//       if (params.length > 0) query += ',';
//       query += ' IsColor = ?';
//       params.push(isColor);
//     }

//     // Append WHERE clause
//     query += ' WHERE ArticleID = ?';
//     params.push(id);

//     // Execute the query with parameterized values
//     const results = await new Promise((resolve, reject) => {
//       connection.query(query, params, (error, results) => {
//         if (error) {
//           console.error('Database query error:', error); // More detailed logging
//           return reject(error);
//         }
//         resolve(results);
//       });
//     });

//     res.status(200).json({ message: "Successfully article updated", results: results });

//   } catch (error) {
//     console.error('Server error:', error); // More detailed logging
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.put('/editPage', async (req, res) => {
//   try {
//     // const { id } = req.params;
//     const {id, old_page_number, new_page_number, page_name } = req.body;

//     // Build the query dynamically based on which fields are provided
//     let query = 'UPDATE article_image SET';
//     const params = [];

//     if (new_page_number !== undefined) {
//       query += ' Page_Number = ?';
//       params.push(new_page_number);
//     }

//     if (page_name !== undefined) {
//       if (params.length > 0) query += ',';
//       query += ' pagename = ?';
//       params.push(page_name);
//     }

//     // Append WHERE clause
//     query += ' WHERE ArticleID = ? and Page_Number = ?';
//     params.push(id, old_page_number);

//     // Execute the query with parameterized values
//     const results = await new Promise((resolve, reject) => {
//       connection.query(query, params, (error, results) => {
//         if (error) {
//           console.error('Database query error:', error); // More detailed logging
//           return reject(error);
//         }
//         resolve(results);
//       });
//     });

//     res.status(200).json({ message: "Successfully page updated", results: results });

//   } catch (error) {
//     console.error('Server error:', error); // More detailed logging
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // app.put('/editJour', async (req, res) => {
// //   try {
// //     // const { id } = req.params;
// //     const {id, fname, lname } = req.body;
// //     console.log(fname, lname);
    
// //     if (fname == null && lname == null) {
// //       res.status(200).json({ message: "Journalist is null" });

// //     }else {
// //       // Build the query dynamically based on which fields are provided
// //       let query = 'UPDATE journalist SET';
// //       const params = [];
  
// //       if (fname !== undefined) {
// //         query += ' Fname = ?';
// //         params.push(fname);
// //       }
  
// //       if (lname !== undefined) {
// //         if (params.length > 0) query += ',';
// //         query += ' Lname = ?';
// //         params.push(lname);
// //       }
  
// //       // Append WHERE clause
// //       query += ' WHERE jourId = ( SELECT j.jourId FROM journalist j JOIN article_journalist aj ON j.jourId = aj.JournalistID WHERE aj.ArticleID = ?);';
// //       params.push(id);
  
// //       // Execute the query with parameterized values
// //       const results = await new Promise((resolve, reject) => {
// //         connection.query(query, params, (error, results) => {
// //           if (error) {
// //             console.error('Database query error:', error); // More detailed logging
// //             return reject(error);
// //           }
// //           resolve(results);
// //         });
// //       });
  
// //       res.status(200).json({ message: "Successfully journalsit updated", results: results });

// //     }

// //   } catch (error) {
// //     console.error('Server error:', error); // More detailed logging
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });


// app.put('/editJour', async (req, res) => {
//   try {
//     const { id, fname, lname } = req.body;
//     console.log(fname, lname);

//     // if (fname == null && lname == null) {
//     //   return res.status(400).json({ message: "No fields to update" });
//     // }

//     // Start building the update query
//     let query = 'UPDATE journalist j JOIN article_journalist aj ON j.jourId = aj.JournalistID SET';
//     const params = [];

//     if (fname !== undefined) {
//       query += ' j.Fname = ?';
//       params.push(fname);
//     }

//     if (lname !== undefined) {
//       if (params.length > 0) query += ',';
//       query += ' j.Lname = ?';
//       params.push(lname);
//     }

//     // Append WHERE clause
//     query += ' WHERE aj.ArticleID = ?';
//     params.push(id);

//     // Execute the query with parameterized values
//     const results = await new Promise((resolve, reject) => {
//       connection.query(query, params, (error, results) => {
//         if (error) {
//           console.error('Database query error:', error);
//           return reject(error);
//         }
//         resolve(results);
//       });
//     });

//     res.status(200).json({ message: "Successfully updated journalist", results: results });

//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.post('/addKeywords', async (req, res) => {
//   const { userid, text, pubid } = req.body;

//   // Prepare SQL queries
//   const deleteTmpQuery = `DELETE FROM tmp WHERE userid = ?`;
//   const insertTmpQuery = `INSERT INTO tmp (userid, text) VALUES (?, ?)`;
//   const deleteTmp2Query = `DELETE FROM tmp2 WHERE userid = ?`;
//   const insertTmp2Query = `
//     INSERT INTO tmp2 
//     SELECT DISTINCT 
//       Keyword, 
//       MID(text, INSTR(text, Keyword) - 1, 1) AS First, 
//       MID(text, INSTR(text, Keyword) + LENGTH(Keyword), 1) AS Last, 
//       INSTR(text, Keyword) AS Start, 
//       1 , 
//       ? 
//     FROM keyword_master, tmp 
//     WHERE tmp.userid = ? AND INSTR(text, Keyword) > 0 AND IFNULL(filter_string, '') = ''`;

//   const selectQuery = `
//     SELECT DISTINCT 
//       tmp2.Keyword, 
//       '' AS String, 
//       '' AS Ok, 
//       '' AS keyid 
//     FROM keyword_master 
//     RIGHT JOIN clientkeyword ON clientkeyword.keywordid = keyword_master.keyid 
//     RIGHT JOIN tmp2 ON keyword_master.keyword = tmp2.keyword 
//     JOIN tmp ON tmp.userid = tmp2.userid AND tmp2.userid = ? 
//     JOIN clientprofile ON clientkeyword.clientid = clientprofile.clientid 
//       AND (clientprofile.status = 366 OR clientprofile.status = 373) 
//     JOIN media_universe_master ON clientprofile.clientid = media_universe_master.clientid 
//       AND media_universe_master.pubid = ? 
//     WHERE text REGEXP CONCAT('[[:<:]]', tmp2.keyword, '[[:>:]]') > 0`;

//   const params = [userid, text, userid, userid, userid];

//   try {
//     // Start a transaction
//     // await new Promise((resolve, reject) => {
//     //   connection.beginTransaction(err => {
//     //     if (err) return reject(err);
//     //     resolve();
//     //   });
//     // });

//     // Execute delete from tmp
//     await new Promise((resolve, reject) => {
//       connection.query(deleteTmpQuery, [userid], (error, results) => {
//         if (error) return reject(error);
//         resolve(results);
//       });
//     });

//     // Execute insert into tmp
//     await new Promise((resolve, reject) => {
//       connection.query(insertTmpQuery, [userid, text], (error, results) => {
//         if (error) return reject(error);
//         resolve(results);
//       });
//     });

//     // Execute delete from tmp2
//     await new Promise((resolve, reject) => {
//       connection.query(deleteTmp2Query, [userid], (error, results) => {
//         if (error) return reject(error);
//         resolve(results);
//       });
//     });

//     // Execute insert into tmp2
//     await new Promise((resolve, reject) => {
//       connection.query(insertTmp2Query, [userid, userid], (error, results) => {
//         if (error) return reject(error);
//         resolve(results);
//       });
//     });

//     // Execute select query
//     const selectResults = await new Promise((resolve, reject) => {
//       connection.query(selectQuery, [userid, pubid], (error, results) => {
//         if (error) return reject(error);
//         resolve(results);
//       });
//     });

//     // Commit the transaction
//     // await new Promise((resolve, reject) => {
//     //   connection.commit(err => {
//     //     if (err) return reject(err);
//     //     resolve();
//     //   });
//     // });

//     res.status(200).json(selectResults);

//   } catch (error) {
   
//     console.error('Server error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Routes
app.get('/getPublications', publicationController.getPublications);
app.post('/getArticles', articleController.getArticles);
app.post('/getArticlesByPageNo', articleController.getArticlesByPageNo);
app.post('/getFullTextById', articleController.getFullTextById);
app.post('/getFilterString', articleController.getFilterString);
app.put('/editArticle', articleController.editArticle);
app.put('/editPage', articleController.editPage);
app.put('/editJour', articleController.editJour);
app.post('/additionalKeywords', additionalKeywordsController.addKeywords);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
