import "./styles.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div id="contact">
          <h3>Contato</h3>
          <ul>
            <li>Telefone Fixo: (81) 3333-4444</li>
            <li>WhatsApp: (81) 99999-8888</li>
            <li>
              <a href="mailto:contato@nandeco.com.br">contato@nandeco.com.br</a>
            </li>
          </ul>
        </div>
        <div id="address">
          <h3>Endereço</h3>
          <p>
            Av. Cais do Apolo, 77, Sala 17, Bairro do Recife, Recife - PE, CEP
            50030-220
          </p>
        </div>
        <div id="payment">
          <h3>Formas de Pagamento</h3>
          <div id="payment-methods">
            <div className="payment-method">
              <img
                src="/images/credit.png"
                alt="Cartão de Crédito"
                className="payment-icon"
              />
              <p>Cartão de Crédito</p>
            </div>
            <div className="payment-method">
              <img
                src="/images/invoice.png"
                alt="Boleto Bancário"
                className="payment-icon"
              />
              <p>Boleto Bancário</p>
            </div>
            <div className="payment-method">
              <img src="/images/pix.png" alt="PIX" className="payment-icon" />
              <p>PIX</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
