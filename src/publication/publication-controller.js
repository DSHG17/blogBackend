import Publication from "./publication-model.js"

export const createPublication = async(req,res)=>{
    try{
        const data = req.body
        let publicationPicture = req.file ? req.file.filename : null
        console.log(publicationPicture)
        
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

export const getAllPublications = async (req, res) => {
    try {
      const publicaciones = await Publication.find().sort({ date: -1 }); // ordenadas por fecha descendente
      res.status(200).json(publicaciones);
    } catch (err) {
      console.error("❌ Error al obtener publicaciones:", err);
      res.status(500).json({
        success: false,
        message: "Error al obtener publicaciones",
        error: err.message
      });
    }
  };