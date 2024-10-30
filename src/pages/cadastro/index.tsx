import { useState, FormEvent } from "react";
import { db } from "../../service/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
export function Cadastro() {
  const [selectInput, setSelectInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    author: "",
    coverImage: "",
    source: "",
  });

  function handleChange(e: React.ChangeEvent<unknown>) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      const { name, value } = target;
      return setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (selectInput === "") {
      return alert("Escolha uma categoria");
    }
    addDoc(collection(db, selectInput), {
      formData,
      created: new Date(),
    })
      .then(() => {
        setFormData({
          title: "",
          summary: "",
          content: "",
          author: "",
          coverImage: "",
          source: "",
        });
        alert("Cadastrado com sucesso!");
      })
      .catch((error) => {
        alert("Erro ao cadastrar" + error);
      });
  }
  return (
    <div className="w-full">
      <div className="w-11/12 max-w-5xl flex justify-between items-center m-auto mb-4">
        <h1 className="md:text-5xl text-center text-3xl text-white font-bold ">
          Cadastro
        </h1>
        <Link
          to={"/noticiasCadastradas"}
          className="flex gap-1 items-center text-white"
        >
          Notícias Cadastradas
          <FaArrowAltCircleRight size={30} color="White" />
        </Link>
      </div>
      <form
        className="w-11/12 max-w-5xl flex flex-col justify-start m-auto mb-4"
        onSubmit={handleRegister}
      >
        <select
          className="py-1 rounded-sm mb-4"
          onChange={(e) => setSelectInput(e.target.value)}
        >
          <option value="">Escolha uma categoria</option>
          <option value="dicas">Dicas</option>
          <option value="acoes">Ações</option>
          <option value="fundos_imobiliario">Fundos Imobiliário</option>
          <option value="criptomoedas">Criptomoedas</option>
          <option value="noticias">Notícias</option>
        </select>
        <label>Titulo</label>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Resumo</label>
        <input
          type="text"
          name="summary"
          placeholder="Resumo"
          value={formData.summary}
          onChange={handleChange}
        />
        <label>Conteúdo</label>

        <textarea
          name="content"
          placeholder="Conteúdo"
          value={formData.content}
          onChange={handleChange}
          required
          className="mb-3 h-[200px] rounded-sm outline-none px-1"
        />
        <label>Autor</label>

        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={formData.author}
          onChange={handleChange}
        />
        <label>Url Imagem</label>
        <input
          type="text"
          name="coverImage"
          placeholder="URL da Imagem de Capa"
          value={formData.coverImage}
          onChange={handleChange}
        />
        <label>Fonte</label>

        <input
          type="text"
          name="source"
          placeholder="Fonte"
          value={formData.source}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-500 py-2 rounded-sm text-white font-semibold mt-2"
        >
          Publicar Post
        </button>
      </form>
    </div>
  );
}
