import Publication from "../publication/publication-model.js";

export const publicationExist = async(publicationId = '') =>{
    const existe = await Publication.findOne({publicationId})
    if(existe){
        throw new Error(`El id no es uno valido`)
    }
}