function QuestionsForm({hidden, incrementPage}) {
    return <div hidden={hidden}>
        <div className="subheading">Questions</div>

        <button type="submit" onClick={() => incrementPage()} className="btn btn-primary min-w-36">
            Save
        </button>
    </div>
}

export default QuestionsForm;