const mongoose =require('mongoose');

const NoteSchema = new mongoose.Schema({

	note:{
		type:String
	},
	company_id:{
		type: mongoose.Schema.Types.ObjectId,
    ref: "company"
	},
	project_id:{
		type: mongoose.Schema.Types.ObjectId,
    ref: "project"
	},
	task_id:{
		type:String
	},
	
	createdBy:{
type: mongoose.Schema.Types.ObjectId,
    ref: "user"
	}
})


module.exports = Note = mongoose.model("note",NoteSchema);
