const router = require("express").Router();
const reader = require('xlsx');


router.get("/getdata", (req,res)=>{
    
    const file = reader.readFile('data.xlsx');
    
    let data = []
    
    const sheets = file.SheetNames

    for(let i = 0; i < sheets.length; i++)
    {
       const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
       temp.forEach((res) => {
          data.push(res)
       })
    }
  

    return res.status(200).json({
        success: true,
        details: data
      });
})

module.exports = router;