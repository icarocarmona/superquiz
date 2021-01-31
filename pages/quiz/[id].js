/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen externalQuestions={dbExterno.questions} externalBg={dbExterno.bg} />
      {/* <pre style={{ color: 'black' }}>{JSON.stringify(dbExterno.questions, null, 4)}</pre> */}
    </ThemeProvider>
  );
}

// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  //   console.log('Info', context.query.id);
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed in get data');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });

  return {
    props: { dbExterno },
  };
}
