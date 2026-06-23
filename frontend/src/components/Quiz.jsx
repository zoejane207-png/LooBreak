function Quiz(props) {
  return <article key={props.quiz._id}>{props.quiz.title}</article>;
}

export default Quiz;
