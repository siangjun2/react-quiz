
function Report({score, total, retry}) {
    return (
        <div>
            <h2>Quiz completed!</h2>
            <p>Your score : {score}/{total}. ({(score/total*100).toFixed(0)}%)</p>
            <button className = "restart-button" onClick = {retry}> Retry quiz </button>
        </div>
    )
}

export default Report;