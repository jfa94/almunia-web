function Welcome({incrementPage, hidden}) {
    return <div hidden={hidden}>
        <div className="subheading">Welcome to Almunia!</div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci consequuntur culpa cumque ea
            est excepturi inventore ipsa, laborum magni molestiae porro quas quo reiciendis repudiandae, sapiente
            similique tempora tenetur?</p>
        <button className="btn btn-primary" onClick={() => incrementPage()}>Next page</button>
    </div>
}

export default Welcome;