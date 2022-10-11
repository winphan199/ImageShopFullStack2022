import { Link } from 'react-router-dom';

function Button({title, type, to, onClick, ...params }) {
    let Component = 'button';
    let props = {
        onClick,
        ...params
    }
    if (type === 'link') {
        Component = Link;
        delete props.onClick;
        props.to = to;
    }
    return <Component {...props}>
        {title}
    </Component>;
}

export default Button;
