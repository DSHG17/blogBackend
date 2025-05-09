import Publication from "./publication-model.js"

export const createPublication = async(req,res)=>{
    try{
        const data = req.body
        let publicationPicture = req.file ? req.file.filename : null
        
        data.publicationPicture  = publicationPicture 
        const publication = await Publication.create(data)
        return res.status(200).json({
            message: "Publicación creada con exito"
        })
    }catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la publicación",
            error: err.message
        });
    }
}