let marketplaceModel = require('../../Database/marketplaceSchema')
const {checkUserExists} = require('../userAPI/checkUserExists')

async function createMarketplace(marketplaceOwner, marketplaceDescription, marketplaceTags, marketplaceName){

    try{
        let targetUser = await checkUserExists(marketplaceOwner)
        let userID = targetUser._id
    
        let newMarketplace = await marketplaceModel({
            marketplaceOwner: userID,
            marketplaceDescription: marketplaceDescription,
            marketplaceName: marketplaceName,
            marketplaceTags: marketplaceTags
        })
    
        await newMarketplace.save()

        return {status: 200, msg: 'Marketplace created successfully'}
    }
    catch(e)
    {
        return {status: 402, msg: e}
    }


}

module.exports = {
    createMarketplace
}