import {checkUserExistsById} from '../userAPI/checkUserExistsById'
import {getMarketplaceByID} from '../marketplaceAPI/getMarketplaceByID'

async function marketplaceHelpful(reviewerID, marketplaceID)
{
    let targetUserID = reviewerID
    let targetMarketplaceID = marketplaceID

    try{
        let targetUser = await checkUserExistsById(targetUserID)
        let targetMarketplace = await getMarketplaceByID(targetMarketplaceID)
    
        if(targetUser != undefined && targetMarketplace != undefined)
        {
            targetMarketplace.positiveRatings.push(targetUserID)
            await targetMarketplace.save()
        }

        res.status(200).send('Helpful review feedback added successfully!')
    }
    catch(err)
    {
        res.send(err)
    }
    
}



module.exports = { marketplaceHelpful }