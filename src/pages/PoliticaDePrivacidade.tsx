'use client';

import React, { useEffect } from 'react';
import { Shield, Printer, ArrowUpRight, ArrowUp } from 'lucide-react';

const secoes = [
  { id: '1', titulo: 'Introdução e Compromisso' },
  { id: '2', titulo: 'Definições Importantes' },
  { id: '3', titulo: 'Nossos Papéis no Tratamento de Dados (LGPD)' },
  { id: '4', titulo: 'Dados que Coletamos e Suas Finalidades' },
  { id: '5', titulo: 'Base Legal para o Tratamento' },
  { id: '6', titulo: 'Compartilhamento de Dados' },
  { id: '7', titulo: 'Direitos dos Titulares de Dados' },
  { id: '8', titulo: 'Segurança da Informação' },
  { id: '9', titulo: 'Retenção e Eliminação de Dados' },
  { id: '10', titulo: 'Cookies e Tecnologias de Rastreamento' },
  { id: '11', titulo: 'Alterações nesta Política' },
  { id: '12', titulo: 'Contato e Encarregado de Dados (DPO)' },
];

const AnchorLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="group flex items-center justify-between py-2 px-3 rounded-md text-sm text-neutral-700 hover:bg-neutral-background hover:text-neutral-dark transition-colors"
  >
    <span className="truncate">{children}</span>
    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

const PoliticaDePrivacidade: React.FC = () => {
  // garante que abre no topo
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden" id="topo">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-white to-secondary/10 pointer-events-none" />
        <div className="container-custom pt-16 pb-10 relative">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-neutral-600">Documento Legal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-dark mb-4">
            Política de Privacidade — Talker Flow
          </h1>
          <p className="text-neutral-700">
            Última atualização:{' '}
            <time dateTime="2025-08-28">28 de agosto de 2025</time>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={handlePrint} className="btn-primary inline-flex items-center gap-2">
              <Printer className="h-5 w-5" />
              Imprimir / Salvar PDF
            </button>
            <a
              href="#conteudo"
              className="px-4 py-3 rounded-lg font-semibold text-neutral-800 bg-neutral-background hover:bg-neutral-background/80 transition-colors"
            >
              Ir para o conteúdo
            </a>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section id="conteudo" className="py-12">
        <div className="container-custom grid lg:grid-cols-[280px_1fr] gap-10">
          {/* Sumário (desktop) */}
          <aside className="hidden lg:block sticky top-6 h-max p-4 rounded-xl border border-neutral-background">
            <h2 className="text-sm font-semibold text-neutral-600 mb-2">Sumário</h2>
            <nav className="space-y-1">
              {secoes.map((s) => (
                <AnchorLink key={s.id} href={`#sec-${s.id}`}>
                  {s.id}. {s.titulo}
                </AnchorLink>
              ))}
            </nav>
          </aside>

          {/* Artigo */}
          <article className="max-w-none">
            <div className="space-y-10 text-neutral-800 leading-relaxed">
              {/* 1 */}
              <section id="sec-1" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                  1. Introdução e Compromisso
                </h2>
                <p>Bem-vindo à Talker Flow!</p>
                <p>
                  Esta Política de Privacidade (“Política”) descreve como a Talker Flow Tecnologia, pessoa jurídica de
                  direito privado, inscrita no CNPJ sob o nº 37.819.469/0001-67, com sede na cidade de São Paulo/SP
                  (“Talker Flow”, “nós”), coleta, utiliza, armazena, compartilha e protege os dados pessoais de seus
                  clientes, usuários da plataforma e visitantes do site (
                  <a className="underline decoration-dotted" href="https://talkerflow.me/" target="_blank" rel="noreferrer">
                    https://talkerflow.me/
                  </a>
                  ).
                </p>
                <p>
                  Nosso compromisso é com a transparência, a segurança e o respeito à sua privacidade, em total
                  conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - “LGPD”) e demais legislações
                  aplicáveis.
                </p>
                <p>Ao utilizar nossos Serviços, você declara que leu, compreendeu e concorda com os termos desta Política.</p>
              </section>

              {/* 2 */}
              <section id="sec-2" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">2. Definições Importantes</h2>
                <p><strong>Dado Pessoal:</strong> Qualquer informação relacionada a uma pessoa natural identificada ou identificável.</p>
                <p><strong>Titular:</strong> A pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.</p>
                <p><strong>Tratamento:</strong> Toda operação realizada com dados pessoais, como coleta, produção, recepção, classificação,
                  utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação
                  ou controle da informação, modificação, comunicação, transferência, difusão ou extração.</p>
                <p><strong>Controlador:</strong> Pessoa natural ou jurídica a quem competem as decisões referentes ao tratamento de dados pessoais.</p>
                <p><strong>Operador:</strong> Pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do Controlador.</p>
                <p><strong>Encarregado de Dados (DPO):</strong> Pessoa indicada pelo Controlador e Operador para atuar como canal de comunicação
                  entre o controlador, os titulares dos dados e a ANPD.</p>
              </section>

              {/* 3 */}
              <section id="sec-3" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                  3. Nossos Papéis no Tratamento de Dados (LGPD)
                </h2>
                <p><strong>A) Talker Flow como CONTROLADORA:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Dados de cadastro (nome, e-mail, telefone, CNPJ) fornecidos para a criação da conta.</li>
                  <li>Dados de navegação em nosso site e plataforma.</li>
                  <li>Dados de contato para fins de suporte, marketing e comunicação.</li>
                </ul>
                <p>Neste cenário, nós tomamos as decisões sobre como e por que esses dados são tratados.</p>

                <p className="mt-4"><strong>B) Talker Flow como OPERADORA:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Dados de contato dos clientes de nossos Clientes (leads, usuários finais).</li>
                  <li>Conteúdo das conversas e interações gerenciadas através da plataforma.</li>
                  <li>Listas de contatos, arquivos e outras informações carregadas na plataforma.</li>
                </ul>
                <p>
                  Neste cenário, o nosso Cliente é o Controlador desses dados. A Talker Flow apenas realiza o tratamento
                  desses dados em nome e de acordo com as instruções e o contrato firmado com o Cliente, que é o
                  responsável por definir a finalidade e a base legal para o tratamento.
                </p>
              </section>

              {/* 4 */}
              <section id="sec-4" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                  4. Dados que Coletamos e Suas Finalidades
                </h2>

                <p className="font-semibold">4.1. Como Controladora:</p>
                <div className="overflow-x-auto rounded-lg border border-neutral-background">
                  <table className="w-full text-left text-sm md:text-base">
                    <thead>
                      <tr className="bg-neutral-background text-neutral-700">
                        <th className="py-3 px-4">Dados Coletados</th>
                        <th className="py-3 px-4">Finalidade do Tratamento</th>
                      </tr>
                    </thead>
                    <tbody className="[&>tr:nth-child(even)]:bg-neutral-background/60">
                      <tr>
                        <td className="py-3 px-4">Dados de Cadastro (Nome, e-mail, telefone, empresa, CNPJ)</td>
                        <td className="py-3 px-4">
                          Criar e gerenciar sua conta; processar pagamentos; prestar suporte técnico e comercial; enviar
                          comunicações administrativas e operacionais.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Dados de Contato (E-mail, telefone)</td>
                        <td className="py-3 px-4">
                          Enviar materiais de marketing (com seu consentimento), novidades sobre a plataforma e responder às suas solicitações.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Dados de Navegação (Cookies, IP, logs)</td>
                        <td className="py-3 px-4">
                          Melhorar a experiência no site e na plataforma; monitorar a segurança; análises estatísticas de uso; cumprir
                          obrigações legais (Marco Civil).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="font-semibold mt-6">4.2. Como Operadora:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Viabilizar o envio e recebimento de mensagens.</li>
                  <li>Operar chatbots e fluxos de automação.</li>
                  <li>Gerar relatórios de atendimento.</li>
                  <li>Armazenar o histórico de conversas de forma segura.</li>
                </ul>
              </section>

              {/* 5 */}
              <section id="sec-5" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">5. Base Legal para o Tratamento</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Execução de Contrato:</strong> Para os dados essenciais à prestação dos nossos serviços ao Cliente.</li>
                  <li><strong>Consentimento:</strong> Para o envio de marketing e comunicações não essenciais, sempre com a opção de cancelamento.</li>
                  <li><strong>Cumprimento de Obrigação Legal ou Regulatória:</strong> Para dados que precisamos manter, como os registros de acesso (logs), conforme o Marco Civil da Internet.</li>
                  <li><strong>Legítimo Interesse:</strong> Para análises de uso da plataforma visando melhorias, desde que não infrinja os direitos e liberdades dos titulares.</li>
                </ul>
              </section>

              {/* 6 */}
              <section id="sec-6" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">6. Compartilhamento de Dados</h2>
                <p>A Talker Flow não vende dados pessoais. O compartilhamento ocorre apenas quando necessário para a prestação dos serviços, com parceiros e fornecedores, sob rigorosas obrigações de confidencialidade e segurança. As principais categorias de compartilhamento são:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Provedores de Infraestrutura:</strong> Serviços de nuvem e servidores (ex: AWS, Google Cloud) para hospedar nossa plataforma.</li>
                  <li><strong>Plataformas de Comunicação (sob instrução do Cliente):</strong> Para conectar a Talker Flow aos canais desejados, como WhatsApp (Meta).</li>
                  <li><strong>Processadores de Pagamento:</strong> Para processar as assinaturas e faturamento.</li>
                  <li><strong>Autoridades Públicas:</strong> Mediante ordem judicial ou requisição de autoridade competente.</li>
                </ul>
              </section>

              {/* 7 */}
              <section id="sec-7" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">7. Direitos dos Titulares de Dados</h2>
                <p>
                  A LGPD garante a você, titular de dados, uma série de direitos. Para exercê-los, entre em contato
                  conosco pelo e-mail: <a className="underline decoration-dotted" href="mailto:contato@talkerflow.me">contato@talkerflow.me</a>. Seus direitos incluem:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Confirmação da existência de tratamento.</li>
                  <li>Acesso aos dados.</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                  <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.</li>
                  <li>Portabilidade dos dados a outro fornecedor.</li>
                  <li>Eliminação dos dados pessoais tratados com o consentimento.</li>
                  <li>Informação sobre as entidades com as quais o controlador realizou uso compartilhado de dados.</li>
                  <li>Revogação do consentimento.</li>
                </ul>
                <p className="mt-3 text-neutral-700">
                  <strong>Importante:</strong> Se você é um cliente final de uma empresa que utiliza a Talker Flow, seus direitos devem ser exercidos
                  diretamente junto a essa empresa (a Controladora dos seus dados).
                </p>
              </section>

              {/* 8 */}
              <section id="sec-8" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">8. Segurança da Informação</h2>
                <p>
                  Adotamos medidas de segurança técnicas e administrativas, alinhadas às melhores práticas de mercado, para proteger os dados
                  pessoais contra acessos não autorizados, perda, alteração, destruição ou qualquer forma de tratamento inadequado. Nossas medidas
                  incluem controle de acesso, criptografia, monitoramento de rede e políticas internas de segurança.
                </p>
              </section>

              {/* 9 */}
              <section id="sec-9" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">9. Retenção e Eliminação de Dados</h2>
                <p>
                  Manteremos seus dados pessoais armazenados somente pelo tempo necessário para cumprir as finalidades para as quais foram coletados,
                  ou para cumprir obrigações legais, contratuais ou para a defesa de direitos. Após o término do contrato e observados os prazos
                  legais, os dados serão eliminados de forma segura.
                </p>
              </section>

              {/* 10 */}
              <section id="sec-10" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                  10. Cookies e Tecnologias de Rastreamento
                </h2>
                <p>
                  Utilizamos cookies em nosso site para melhorar sua experiência. São pequenos arquivos de texto armazenados em seu navegador.
                  Eles podem ser essenciais para o funcionamento do site, ou utilizados para coletar dados analíticos e direcionar publicidade.
                  Você pode gerenciar suas preferências de cookies diretamente nas configurações do seu navegador.
                </p>
              </section>

              {/* 11 */}
              <section id="sec-11" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">11. Alterações nesta Política</h2>
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou na legislação.
                  Alterações relevantes serão comunicadas com antecedência por e-mail ou através de um aviso em nossa plataforma. Recomendamos
                  que você revise esta página regularmente.
                </p>
              </section>

              {/* 12 */}
              <section id="sec-12" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                  12. Contato e Encarregado de Dados (DPO)
                </h2>
                <p>
                  Para exercer seus direitos, ou para esclarecer qualquer dúvida sobre esta Política de Privacidade, entre em contato com nosso
                  Encarregado de Dados (DPO) através do canal:
                </p>
                <p>
                  <strong>E-mail:</strong>{' '}
                  <a className="underline decoration-dotted" href="mailto:contato@talkerflow.me">contato@talkerflow.me</a>
                </p>
              </section>

              {/* CTA final */}
              <section className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-dark mb-1">Precisa de ajuda?</h3>
                  <p className="text-neutral-700">Nossa equipe pode orientar sobre como esta Política se aplica ao seu caso.</p>
                </div>
                <a href="#contato" className="btn-primary inline-flex">Falar com suporte</a>
              </section>

              {/* voltar ao topo */}
              <div className="pt-4">
                <a
                  href="#topo"
                  onClick={handleTop}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-neutral-background hover:bg-neutral-background/80 text-neutral-800 font-semibold transition-colors"
                >
                  <ArrowUp className="h-5 w-5" /> Voltar ao topo
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default PoliticaDePrivacidade;