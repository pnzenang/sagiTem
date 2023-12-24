import { styled } from "styled-components";
import socialLinks from "../utils/socialLinks";

const SocialLinks = () => {
  return (
    <Wrapper>
      <ul className="social-icons">
        {socialLinks.map((link) => {
          const { id, site, icon } = link;
          return (
            <li key={id} className="hover:text-primary">
              <a href={site} className="social-icon">
                {icon}
              </a>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .social-icons {
    display: grid;
    margin-top: 3rem;
    width: 20rem;
    place-items: center;
    justify-items: center;
    grid-template-columns: repeat(5, 1fr);
  }
  .social-icon {
    font-size: 1.5rem;
    color: var(--clr-grey-1);
    transition: var(--transition);
    padding: 0 auto;
  }
  .social-icon:hover {
    color: var(--clr-primary-5);
  }
`;
export default SocialLinks;
