
import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";


const addSalary =async (req,res)=>{
     try{
        const {employeeId,basicSalary,allowances,deductions,payDate} = req.body;
        const totalSalary = parseInt(basicSalary)+ parseInt(allowances) - parseInt(deductions);
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary:totalSalary,
            payDate
         });
         await newSalary.save();
         return res.status(200).json({success:true, message: "Salary added successfully"});
        }
     catch(error){
        console.error("Error in addSalary:", error);
        return res.status(500).json({success:false, error: "add salary Server Error"});
     }
}

const getSalary = async (req,res)=>{
    try{
        const {id,role} = req.params;
        let salary;
        if(role === 'admin'){
            salary = await Salary.find().populate('employeeId','employeeId');   // returm empty array
        }
         //salary = await Salary.find({employeeId:id}).populate('employeeId','employeeId');   // returm empty array
       else{    //   if(!salary || salary.length===0)
            const employee = await Employee.findOne({userId:id})
            if (!employee) {
                return res.status(404).json({ success: false, message: "Employee not found" });
            }
            
            salary = await Salary.find({employeeId:employee._id}).populate('employeeId','employeeId');
         }
        return res.status(200).json({success:true, salary});
    }
    catch(error){
        console.error("Error in getSalary:", error);
        return res.status(500).json({success:false, error: "get salary Server Error"});
    }
}

export {addSalary,getSalary}