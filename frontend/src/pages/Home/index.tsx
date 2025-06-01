import React from "react";
import Header from "../../components/Header";
import "./styles.css";

const Home: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
      <main className="container">
        <section id="history">
          <h2>Nossa História</h2>
          <p>
            Fundada em 2010, a Nandeco nasceu da visão de três profissionais
            apaixonados por tecnologia e inovação. Começamos como uma pequena
            startup focada em consultoria de TI e, ao longo dos anos, expandimos
            nossos serviços para atender às crescentes demandas do mercado
            digital.
          </p>
          <p>
            Hoje, somos referência em soluções tecnológicas, atendendo mais de
            500 clientes em todo o Brasil, desde pequenas empresas até grandes
            corporações. Nossa missão é transformar negócios através da
            tecnologia, oferecendo soluções personalizadas e inovadoras.
          </p>
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section id="gallery">
          <h2>Nossa Estrutura e Equipe</h2>
          <div className="photo-gallery">
            <figure>
              <img src="/images/headquarters.jpg" alt="Nossa Sede" />
              <figcaption>Sede Principal - Recife/PE</figcaption>
            </figure>
            <figure>
              <img src="/images/meeting.webp" alt="Sala de Reuniões" />
              <figcaption>Sala de Reuniões Moderna</figcaption>
            </figure>
            <figure>
              <img src="/images/data_center.jpeg" alt="Data Center" />
              <figcaption>Data Center Seguro</figcaption>
            </figure>
            <figure>
              <img src="/images/team.jpg" alt="Equipe" />
              <figcaption>Nossa Equipe de Especialistas</figcaption>
            </figure>
          </div>
        </section>

        <section id="services-presentation">
          <h2>Nossos Serviços</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Consultoria em TI</h3>
              <p>
                Análise e implementação de soluções tecnológicas personalizadas
                para seu negócio.
              </p>
            </div>
            <div className="service-card">
              <h3>Desenvolvimento de Software</h3>
              <p>
                Soluções sob medida para otimizar seus processos e aumentar sua
                produtividade.
              </p>
            </div>
            <div className="service-card">
              <h3>Segurança da Informação</h3>
              <p>
                Proteção de dados e implementação de políticas de segurança
                robustas.
              </p>
            </div>
            <div className="service-card">
              <h3>Cloud Computing</h3>
              <p>Migração e gerenciamento de infraestrutura em nuvem.</p>
            </div>
          </div>
        </section>

        <section id="founders">
          <h2>Nossos Fundadores</h2>
          <table>
            <thead>
              <tr>
                <th>Cargo</th>
                <th>Nome</th>
                <th>Breve CV</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CEO</td>
                <td>Fernando Loureiro</td>
                <td>
                  Bacharel em Ciência da Computação, Data Scientist Jr e CTO da
                  Skamboo.
                </td>
              </tr>
              <tr>
                <td>CTO</td>
                <td>André Sousa</td>
                <td>
                  Bacharel em Ciência da Computação, Desenvolvedor Frontend
                  Junior e especialista em Firebase.
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default Home;
