const router = require("express").Router();
const reader = require('xlsx');


router.post("/", (req,res)=>{
    
  try{
    let excelFile  = 'data.xlsx';
    
    const sheetName = "Stock" // <-- Change to the actual sheet name.
    const workbook = reader.readFile(excelFile);

    // Overwrite worksheet
    // workbook.Sheets[sheetName] = reader.utils.json_to_sheet(req.body.cart);
    // reader.writeFile(workbook, excelFile); 
    workbook.Sheets[sheetName] = reader.utils.json_to_sheet(req.body.final);
    reader.writeFile(workbook, excelFile); 
  

     res.status(200).json({
        success: true
      });
  }
  catch(err)
  {
    console.log(err);  
    res.status(400).json({
      success: false
    });
  }
})

module.exports = router;