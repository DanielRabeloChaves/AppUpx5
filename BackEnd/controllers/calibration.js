const { 
    modelAllStatusCalibration
 } = require('../models/calibration/calibration');

async function getAllStatusCalibrationController(req, res, next){
    try{
      const calibrations = await modelAllStatusCalibration();
      if(!calibrations)
        return res.status(200).json({ error: "Não possui status de calibragem" });
    
        res.status(200).json(calibrations)
    }catch(err){
        console.log(err)
      return res.status(404).json({ error: "Erro ao buscar status de calibragem" });
    }
}

module.exports = { 
    getAllStatusCalibrationController
};