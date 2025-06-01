import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { clienteService } from "../../services/api";

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    estadoCivil: "solteiro",
    escolaridade: "2_completo",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatarCPF = (cpf: string) => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    return cpfLimpo
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const validarCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf === "" || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
      return false;

    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  const validarNome = (nome: string) => {
    if (!nome) return false;
    if (/[@#$%&!?\/+=.{}[\]<>;0-9]/.test(nome)) return false;
    const palavras = nome.trim().split(/\s+/);
    if (palavras.length < 2) return false;
    if (palavras[0].length < 2) return false;
    return true;
  };

  const validarIdade = (dataNascimento: string) => {
    if (!dataNascimento) return false;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade >= 18;
  };

  const validarTelefone = (telefone: string) => {
    if (!telefone) return true;
    const telefoneDigitos = telefone.replace(/\D/g, "");
    const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    return (
      telefoneRegex.test(telefone) &&
      (telefoneDigitos.length === 10 || telefoneDigitos.length === 11)
    );
  };

  const validarSenha = (senha: string) => {
    const temMinimoCaracteres = senha.length >= 6;
    const temNumero = /\d/.test(senha);
    const temMaiuscula = /[A-Z]/.test(senha);
    const temCaractereEspecial = /[@#$%&!?\/+=.]/.test(senha);
    const temCaractereNaoPermitido = /[{}[\]<>;]/.test(senha);

    return (
      temMinimoCaracteres &&
      temNumero &&
      temMaiuscula &&
      temCaractereEspecial &&
      !temCaractereNaoPermitido
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    let mensagemErro = "";

    if (!formData.email) mensagemErro += "E-mail é obrigatório. ";
    if (!formData.senha) mensagemErro += "Senha é obrigatória. ";
    if (!formData.confirmarSenha)
      mensagemErro += "Confirmação de senha é obrigatória. ";

    if (formData.senha && formData.confirmarSenha) {
      if (formData.senha !== formData.confirmarSenha) {
        mensagemErro += "As senhas não coincidem. ";
      } else if (!validarSenha(formData.senha)) {
        mensagemErro += "Senha inválida (verifique as regras). ";
      }
    }

    if (!formData.nome) {
      mensagemErro += "Nome completo é obrigatório. ";
    } else if (!validarNome(formData.nome)) {
      mensagemErro +=
        "Formato de nome inválido (mín. 2 palavras, 1ª com mín. 2 letras, sem caracteres especiais ou números). ";
    }

    if (!formData.cpf) {
      mensagemErro += "CPF é obrigatório. ";
    } else if (!validarCPF(formData.cpf)) {
      mensagemErro += "CPF inválido. ";
    }

    if (!formData.dataNascimento) {
      mensagemErro += "Data de nascimento é obrigatória. ";
    } else if (!validarIdade(formData.dataNascimento)) {
      mensagemErro += "É necessário ser maior de 18 anos. ";
    }

    if (!validarTelefone(formData.telefone)) {
      mensagemErro +=
        "Formato de telefone inválido (use (XX) XXXXX-XXXX ou (XX) XXXX-XXXX). ";
    }

    if (mensagemErro) {
      setError(mensagemErro.trim());
      return;
    }

    try {
      const response = await clienteService.cadastrar({
        email: formData.email,
        senha: formData.senha,
        login: formData.email,
        nome: formData.nome,
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.message || "Erro ao cadastrar cliente");
      }
    } catch (err) {
      setError("Erro ao cadastrar cliente. Tente novamente.");
    }
  };

  const limparFormulario = () => {
    setFormData({
      email: "",
      senha: "",
      confirmarSenha: "",
      nome: "",
      cpf: "",
      dataNascimento: "",
      telefone: "",
      estadoCivil: "solteiro",
      escolaridade: "2_completo",
    });
    setError("");
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "70vh" }}>
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Cadastro de Cliente
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Cliente cadastrado com sucesso! Redirecionando...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2">Requisitos da Senha:</Typography>
              <ul>
                <li>Pelo menos 6 caracteres</li>
                <li>Pelo menos 1 número (0-9)</li>
                <li>Pelo menos 1 letra maiúscula (A-Z)</li>
                <li>
                  Pelo menos 1 caractere especial permitido: @ # $ % & ! ? / + =
                  .
                </li>
                <li>Caracteres NÃO permitidos: {} [ ] &lt; &gt; ;</li>
              </ul>
            </Box>

            <TextField
              fullWidth
              label="Nome Completo"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const formattedCPF = formatarCPF(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  cpf: formattedCPF,
                }));
              }}
              margin="normal"
              required
              inputProps={{ maxLength: 14 }}
            />

            <TextField
              fullWidth
              label="Data de Nascimento"
              name="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="Telefone (Opcional)"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              margin="normal"
              placeholder="(XX) XXXXX-XXXX"
            />

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Estado Civil</FormLabel>
              <RadioGroup
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="solteiro"
                  control={<Radio />}
                  label="Solteiro(a)"
                />
                <FormControlLabel
                  value="casado"
                  control={<Radio />}
                  label="Casado(a)"
                />
                <FormControlLabel
                  value="divorciado"
                  control={<Radio />}
                  label="Divorciado(a)"
                />
                <FormControlLabel
                  value="viuvo"
                  control={<Radio />}
                  label="Viúvo(a)"
                />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel>Escolaridade</FormLabel>
              <Select
                name="escolaridade"
                value={formData.escolaridade}
                onChange={handleSelectChange}
              >
                <MenuItem value="1_incompleto">1º grau incompleto</MenuItem>
                <MenuItem value="1_completo">1º grau completo</MenuItem>
                <MenuItem value="2_completo">2º grau completo</MenuItem>
                <MenuItem value="superior">Nível superior</MenuItem>
                <MenuItem value="pos_graduado">Pós-graduado</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Cadastrar
              </Button>
              <Button fullWidth variant="outlined" onClick={limparFormulario}>
                Limpar
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate("/login")}
              >
                Voltar
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Cadastro;
