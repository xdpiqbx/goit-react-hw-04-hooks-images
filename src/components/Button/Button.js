import s from './Button.module.scss';

export default function Button(props) {
  return (
    <button type="button" className={s.Button} onClick={props.onPageChange}>
      Load more
    </button>
  );
}
