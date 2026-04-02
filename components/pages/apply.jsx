
const About = () => {
    return (
        <>
            <h1>Apply</h1>
            <form action="/admin/users" method="GET">
                <label> Startup Name:
                    <input type="text" name="fname" minLength="3" maxLength="24" required/>
                </label>
                <label> Sector:
                    <input type="text" name="fname" minLength="3" maxLength="24" required/>
                </label>
                <label> Founder 1:
                    <input type="text" name="fname" minLength="3" maxLength="24" required/>
                </label>
                <label> Founder 2:
                    <input type="text" name="fname" minLength="3" maxLength="24"/>
                </label>
                <label> Founder 3:
                    <input type="text" name="fname" minLength="3" maxLength="24"/>
                </label>

                <label> Email:
                    <input type="email" name="email"/>
                </label>

                <label> Phone:
                    <input type="tel" name="phone"/>
                </label>
                {/*<label> Password:*/}
                {/*    <input type="password" name="psw"*/}
                {/*           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"*/}
                {/*           title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>*/}
                {/*</label>*/}

                <label> Target Round:
                    <input type="radio" name="target_round" value="preseed"/>Preseed
                    <input type="radio" name="target_round" value="seed"/>Seed
                    <input type="radio" name="target_round" value="series_a"/>Series A
                    <input type="radio" name="target_round" value="series_b"/>Series B
                    <input type="radio" name="target_round" value="series_c"/>Series C
                </label>

                <label> Upload Deck:
                    <input type="text" name="fname" minLength="3" maxLength="24" required/>
                </label>

                <button type="submit">Submit</button>
            </form>

        </>
    )
};

export default About;