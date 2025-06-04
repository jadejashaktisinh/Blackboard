import { type RouteConfig, index, route } from "@react-router/dev/routes";

const redirectToAuth = () => {
    const userId = localStorage.getItem('_id');
    window.location.href = userId ? '/classes' : '/login';
    return null;
};

export default [
    route('/', "routes/root.tsx"),
    route('/login', "components/auth/Login.tsx"),
    route('/signup', "components/auth/Signup.tsx"),
    route('/classes', "components/classes/ClassContainer.tsx", [
        index("components/classes/ClassListConatiner.tsx"),
        route(':id', "components/classes/class/ClassDetails.tsx", [
            index("components/classes/class/stream/Stream.tsx"),
            route('classwork', "components/classes/class/classwork/ClassWork.tsx"),
            route('people', 'components/classes/class/people/People.tsx')
        ])
    ])
] satisfies RouteConfig;
