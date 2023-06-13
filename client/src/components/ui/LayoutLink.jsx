import {Link, useMatch} from "react-router-dom";

const LayoutLink = ({to, children, ...props}) => {
   const match = useMatch(to)

   console.log(match)
   return (
      <Link to={to} className={match ? 'bg-white' : ''} {...props}>{children}</Link>
   );
};

export default LayoutLink;