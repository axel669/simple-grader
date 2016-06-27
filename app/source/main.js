import "theme/default";
import {Settings, Session} from "settings";
import DataCenter from "datacenter";

import firebase from "plugins/firebase";

const {Route} = ReactRouter;

const Main = React.createClass({
    async componentDidMount() {
        if (await firebase.currentUser === null) {
            App.navigation.replace("/register");
        } else {
            App.navigation.replace("/list");
        }
    },
    render() {
        return (
            <UI.Screen title="Simple Grader">
                <div style={{textAlign: 'center'}}>
                    Checking Auth
                </div>
            </UI.Screen>
        );
    }
});

const Register = React.createClass({
    async register({email, password}) {
        Dialog.spinner("Registering");
        try {
            const userInfo = firebase.registerEmail(email, password);
            console.log(userInfo);
            chrono.trigger(16, () => App.navigation.replace("/list"));
        } catch (e) {
            console.error(e);
        }
        Dialog.dismiss();
    },
    render() {
        return (
            <UI.Screen title="Simple Grader" width={325}>
                <UI.Card>
                    <UI.Form submitText="Register" onSubmit={this.register}>
                        <UI.TextInput formName="email" inputType="text" placeholder="Email" />
                        <UI.TextInput formName="password" inputType="text" type="password" placeholder="Password" />
                    </UI.Form>
                </UI.Card>
            </UI.Screen>
        );
    }
});

const List = React.createClass({
    getInitialState() {
        return {list: null}
    },
    async componentDidMount() {
        // await chrono.wait(1000);
        this.setState({
            list: factotum.range(10, n => ({name: `Gradebook #${n}`, class: `ASTRO ${350 + n}`, time: Date.now()}))
        });
    },
    render() {
        const {list} = this.state;

        return (
            <UI.Screen title="Simple Grader" scrollable>
                {list === null ?
                    "Loading Gradebooks" :
                    <UI.Flexbox colCount={3} minWidth={220} autopad>
                        {list.map(section => (
                            <UI.Card title={section.name}>
                                <div>Class: {section.class}</div>
                                <div>Time: {chrono(section.time).format("{hour/12}:{minute}")}</div>
                                <UI.Flexbox colCount={2}>
                                    <UI.Button text="Open" fill flush />
                                    <UI.Button text="Delete" color="red" fill flush />
                                </UI.Flexbox>
                            </UI.Card>
                        ))}
                    </UI.Flexbox>
                }
            </UI.Screen>
        );
    }
});

App.start(
    <Route>
        <Route path="/" component={Main} />
        <Route path="/register" component={Register} />
        <Route path="/list" component={List} />
    </Route>,
    {initialPath: '/'}
);
