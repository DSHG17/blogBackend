import Commentary from "./commentary-model.js"

export const createComment = async (req, res) => {
    try {
      const data = req.body;
  
      const comment = await Commentary.create(data);
  
      return res.status(200).json({
        message: "Comentario creado con éxito",
        comment
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error al crear el comentario",
        error: err.message
      });
    }
  };



export const getCommentsByPublication = async (req, res) => {
  try {
    const { publicationId } = req.params;

    const comentarios = await Commentary.find({ publicationId })
      .sort({ date: -1 }); 

    res.status(200).json(comentarios);
  } catch (err) {
    console.error("Error al obtener comentarios:", err);
    res.status(500).json({
      success: false,
      message: "Error al obtener comentarios",
      error: err.message
    });
  }
};
