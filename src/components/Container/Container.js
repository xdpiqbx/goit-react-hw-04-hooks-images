import s from './Container.module.scss';
export default function Container(props) {
  return <div className={s.wrapper}>{props.children}</div>;
}
