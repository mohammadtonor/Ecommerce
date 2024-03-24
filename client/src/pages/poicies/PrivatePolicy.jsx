import './privatePolicy.scss';
import BreadCrump from '../../components/BreadCrump';
import Meta from '../../components/Meta';
import PrivateCard from '../../components/PolicyCard';

const privateItems = [
  {
    title: "1. Introduction",
    content: "These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com."
  },
  {
    title: "1. Introduction",
    content: "These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com"
    + "These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept these Website Standard Terms and Conditions."
  },
  {
    title: "1. Introduction",
    content: "These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com."
  }
];

const PrivatePolicy = () => {
  return (
    <>
        <Meta title='Private Policy'/>
        <BreadCrump title='Private Policy'/>
        <PrivateCard items={privateItems}/>
    </>
  )
}

export default PrivatePolicy