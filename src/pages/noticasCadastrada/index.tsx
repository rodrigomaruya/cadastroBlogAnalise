import { db } from "../../service/firebase";
import {
  getDocs,
  query,
  orderBy,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

interface GetProps {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  coverImage: string;
  source: string;
  status: string;
  created: Date | string;
}

export function NoticiasCadastradas() {
  const [selectInput, setSelectInput] = useState("");
  const [getDocuments, setGetDocuments] = useState<GetProps[]>([]);

  function formatarHora(seconds: string, nanosecond: string) {
    const dateInMillis = Number(seconds) * 1000 + Number(nanosecond) / 1000000;
    const formattedDate = new Date(dateInMillis).toISOString().split("T")[0];
    return formattedDate;
  }
  useEffect(() => {
    async function handleGet() {
      if (selectInput === "") {
        return;
      }
      const ref = collection(db, selectInput);
      const queryRef = query(ref, orderBy("created", "asc"));

      await getDocs(queryRef)
        .then((snapshot) => {
          const lista = [] as GetProps[];
          snapshot.forEach((doc) => {
            lista.push({
              created: formatarHora(
                doc.data().created.seconds,
                doc.data().created.nanoseconds
              ),
              title: doc.data().formData.title,
              id: doc?.id,
              summary: doc.data().formData.summary,
              content: doc.data().formData.content,
              author: doc.data().formData.author,
              coverImage: doc.data().formData.coverImage,
              source: doc.data().formData.source,
              status: doc.data().status,
            });
          });
          setGetDocuments(lista);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    handleGet();
  }, [selectInput, getDocuments]);
  async function handleDelete(id: string) {
    const ref = collection(db, selectInput);
    await deleteDoc(doc(ref, id));
  }

  return (
    <div className="w-full">
      <div className="w-11/12 max-w-5xl m-auto flex justify-between items-center gap-2">
        <div className="w-full py-2 flex items-center gap-2">
          <select
            className="w-full max-w-xs py-1"
            onChange={(e) => setSelectInput(e.target.value)}
          >
            <option value="">Escolha uma categoria</option>
            <option value="dicas">Dicas</option>
            <option value="acoes">Ações</option>
            <option value="fundos_imobiliario">Fundos Imobiliário</option>
            <option value="criptomoedas">Criptomoedas</option>
            <option value="noticias">Notícias</option>
          </select>
        </div>
        <Link to={"/cadastro"} className=" text-white">
          <FaArrowAltCircleLeft size={30} />
        </Link>
      </div>

      {getDocuments.length > 0 &&
        getDocuments.map((item) => (
          <section
            className="w-11/12 max-w-5xl flex gap-3 m-auto flex-col border  py-3 px-2 mb-4"
            key={item.id}
          >
            <h2 className="flex-1 text-white border-b">
              <strong>Título: </strong> {item.title}
            </h2>
            <p className="flex-1 text-white border-b">
              <strong>Resumo: </strong>
              {item.summary}
            </p>
            <p className="flex-1 text-white border-b">
              <strong>Conteúdo: </strong>
              {item.content}
            </p>
            <p className="flex-1 text-white border-b">
              <strong>Autor: </strong> {item.author}
            </p>
            <p className="flex-1 text-white border-b">
              <strong>Url imagem:</strong>
              {item.coverImage}
            </p>
            <p className="flex-1 text-white border-b">
              <strong>Origem: </strong>
              {item.source}
            </p>
            <p className="flex-1 text-white border-b">
              <strong>Data: </strong>
              {item.created.toString()}
            </p>
            <p className="flex-1 text-white border-b">
              <strong>Status: </strong>
              {item.status}
            </p>

            <button
              className="bg-blue-600 py-1 px-1 rounded-sm text-white"
              onClick={() => handleDelete(item.id)}
            >
              Deletar
            </button>
          </section>
        ))}
    </div>
  );
}
