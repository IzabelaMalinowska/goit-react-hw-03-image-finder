import { Dna } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.Loader}>
    <div className={css.LoaderOverlay} />
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClassName="dna-wrapper"
    />
  </div>
);

export default Loader;