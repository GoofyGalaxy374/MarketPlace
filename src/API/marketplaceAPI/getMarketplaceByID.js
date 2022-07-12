let marketplaceModel = require('../../Database/marketplaceSchema')

async function getMarketplaceById(marketplaceID){
    try{
        let targetMarketplace = await marketplaceModel.findById({_id: marketplaceID}).populate('marketplaceOwner')
        return targetMarketplace
    }
    catch(e){
        return e 
    }
    
}

module.exports = {getMarketplaceById}