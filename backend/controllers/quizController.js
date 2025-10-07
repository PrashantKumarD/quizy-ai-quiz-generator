export const submitQuiz = async (req,res) => {
    try{
        const {questions =[],answers=[]} = req.body;
        if(!Array.isArray(questions) || !Array.isArray(answers) || questions.length ===0 || answers.length ===0 ){
            return res.status(400).json({success:false,error:"Questions and answers must be non-empty arrays."});
        }
        let correct =0;
        questions.forEach((q,i)=>{
            if(q.correctIndex === answers[i]) correct++;
        });
        const scorePercentage = (correct/questions.length)*100;

        const feedback = 
            scorePercentage >= 80
            ? "Excellent work! You have a strong understanding of the material."
            : scorePercentage >=50
            ? "Good job! But there's room for improvement."
            : "Keep trying! Review the material and practice more.";

            return res.status(200).json({success:true,score : scorePercentage,correct,total : questions.length,feedback});

    }




    catch(err){
        console.error("Quiz submission error", err);
        return res.status(500).json({success:false,error:err.message || "Failed to submit quiz."});
    }
}