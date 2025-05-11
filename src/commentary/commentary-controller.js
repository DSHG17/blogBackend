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