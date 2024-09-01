const urls = {
  cdn: 'https://d2maxvwz12z6fm.cloudfront.net',
  // api: 'https://api.legion-hq.com:3001',
  listPath: 'https://legionhq2.com/list'
};


const getImageUrl = (card, list, usingOriginalImage=false)=>{
  let url = `${urls.cdn}/${card.cardType}Cards/${card.imageName}`;

  if(usingOriginalImage || list.isUsingOldPoints && card.oldCard)
    url = `${urls.cdn}/${card.cardType}Cards/original-${card.imageName}`;
  return url;
}

const getIconUrl = (card, list=null, usingOriginalImage=false)=>{
 let url = `${urls.cdn}/${card.cardType}Icons/${card.imageName}`;
 if(usingOriginalImage || list.isUsingOldPoints && card.oldCard)
  url = `${urls.cdn}/${card.cardType}Icons/original-${card.imageName}`;
 return url;
}

export default urls;

export {getImageUrl, getIconUrl}
