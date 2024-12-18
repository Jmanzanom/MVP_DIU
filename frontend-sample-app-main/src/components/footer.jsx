import React from 'react';
import styled from 'styled-components';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import '../stylesheets/footer/index.scss';

// Estilos del contenedor principal del footer
const FooterContainer = styled.footer`
  background-color: #005e94;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

// Estilos para las secciones del footer
const Section = styled.div`
  flex: 1 1 200px;
  margin: 10px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

// Estilo para los enlaces
const Link = styled.a`
  text-decoration: none;
  color: white;
  &:hover {
    color: #00bcd4;
    text-decoration: underline;
  }
`;

const FooterLogo = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const LogoImage = styled.img`
  width: 100px;
  margin-bottom: 10px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex: 1 1 200px;
  margin: 10px;
`;

const SocialIcon = styled.a`
  font-size: 20px;
  color: white;
  text-decoration: none;
  &:hover {
    color: #00bcd4;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Section>
        <SectionTitle>UNIVERSIDAD</SectionTitle>
        <List>
          <ListItem><Link href="https://usm.cl/universidad/historia/">Nuestra Historia</Link></ListItem>
          <ListItem><Link href="https://usm.cl/universidad/federico-santa-maria/">Federico Santa María</Link></ListItem>
          <ListItem><Link href="https://usm.cl/universidad/plan-estrategico-institucional/">Definiciones Estratégicas</Link></ListItem>
          <ListItem><Link href="https://usm.cl/universidad/modelo-educativo/">Modelo Educativo</Link></ListItem>
          <ListItem><Link href="https://usm.cl/universidad/rectoria/">Organización</Link></ListItem>
        </List>
      </Section>
      <Section>
        <SectionTitle>CAMPUS Y SEDES</SectionTitle>
        <List>
          <ListItem><Link href="https://usm.cl/universidad/campus-y-sedes/">Información Campus y Sedes</Link></ListItem>
          <ListItem><Link href="https://tour360.usm.cl/">Tour Virtual</Link></ListItem>
        </List>
      </Section>
      <Section>
        <SectionTitle>SERVICIOS</SectionTitle>
        <List>
          <ListItem><Link href="https://aula.usm.cl/portada/index.php">Aula USM</Link></ListItem>
          <ListItem><Link href="https://autoservicio.usm.cl/PROD/twbkwbis.P_GenMenu?name=homepage">Portal de Autoservicio Institucional</Link></ListItem>
          <ListItem><Link href="https://dti.usm.cl/">Dirección de Tecnologías de la Información</Link></ListItem>
        </List>
      </Section>
      <Section>
        <SectionTitle>REDES SOCIALES</SectionTitle>
        <List>
          <ListItem><Link href = 'https://www.facebook.com/bibliotecausmsanjoaquin'><SocialIcon><Facebook/> Facebook</SocialIcon></Link></ListItem>
          <ListItem><Link href = 'https://www.instagram.com/biblioteca.usm/'><SocialIcon><Instagram/> Instragram</SocialIcon></Link></ListItem>
          <ListItem><Link href = 'https://x.com/Bibliotecausm'><SocialIcon><Twitter/> Twitter</SocialIcon></Link></ListItem>
        </List>
      </Section>
      <FooterLogo>
        <LogoImage src="https://usm.cl/wp-content/uploads/2021/07/usm_cl.svg" alt="Logo USM" />
        <div className='texto-footer'><p>© Universidad Técnica Federico Santa María</p></div>
        
      </FooterLogo>
      
    </FooterContainer>
  );
};

export default Footer;
