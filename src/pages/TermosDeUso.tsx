'use client';

import React from 'react';
import { FileText, Printer, ArrowUpRight, ArrowUp } from 'lucide-react';

const termos = [
  { id: '1', titulo: 'Aceitação e Partes' },
  { id: '2', titulo: 'Objeto e Serviços' },
  { id: '3', titulo: 'Conta, Elegibilidade e Responsabilidades do Cliente' },
  { id: '4', titulo: 'Uso Permitido e Proibições' },
  { id: '5', titulo: 'Planos, Preços e Pagamentos' },
  { id: '6', titulo: 'Upgrades e Downgrades' },
  { id: '7', titulo: 'Integrações com Terceiros' },
  { id: '8', titulo: 'Proteção de Dados e Privacidade (LGPD)' },
  { id: '9', titulo: 'Conteúdos, Titularidade e Licenças' },
  { id: '10', titulo: 'Disponibilidade, Suporte e Manutenção' },
  { id: '11', titulo: 'Garantias, Isenções e Limites de Responsabilidade' },
  { id: '12', titulo: 'Indenização' },
  { id: '13', titulo: 'Vigência, Cancelamento e Rescisão' },
  { id: '14', titulo: 'Comunicações e Notificações' },
  { id: '15', titulo: 'Anticorrupção e Conformidade' },
  { id: '16', titulo: 'Alterações dos Termos' },
  { id: '17', titulo: 'Disposições Gerais' },
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

const TermosDeUso: React.FC = () => {
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
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-neutral-600">Documento Legal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-dark mb-4">
            Termos de Uso — Talker Flow
          </h1>
          <p className="text-neutral-700">
            Última atualização: <time dateTime="2025-08-01">01/08/2025</time>
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
              {termos.map((t) => (
                <AnchorLink key={t.id} href={`#sec-${t.id}`}>
                  {t.id}. {t.titulo}
                </AnchorLink>
              ))}
            </nav>
          </aside>

          {/* Artigo */}
          <article className="max-w-none">
            <div className="space-y-10 text-neutral-800 leading-relaxed">
              {/* 1 */}
              <section id="sec-1" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">1. Aceitação e Partes</h2>
                <p>
                  1.1. Estes Termos de Uso (“Termos”) regem o acesso e uso da plataforma Talker Flow, seu site,
                  painéis administrativos, APIs, integrações e demais funcionalidades (“Plataforma”).
                </p>
                <p>
                  1.2. Ao criar conta, acessar ou utilizar a Plataforma, você (“Cliente” ou “Usuário”) declara ter lido,
                  compreendido e aceitado integralmente estes Termos e a Política de Privacidade aplicável.
                </p>
                <p>
                  1.3. Fornecedor: Talker Flow Tecnologia, CNPJ 37.819.469/0001-67, sede na cidade de São Paulo,
                  e-mail: <a className="underline decoration-dotted" href="mailto:contato@talkerflow.me">contato@talkerflow.me</a> (“Talker Flow”, “nós”).
                </p>
              </section>

              {/* 2 */}
              <section id="sec-2" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">2. Objeto e Serviços</h2>
                <p>
                  2.1. A Talker Flow disponibiliza solução de atendimento e automação conversacional, com multiusuários,
                  gestão de leads, chatbots, integrações e relatórios, incluindo conectores com canais de mensagem
                  (ex.: WhatsApp Business via API oficial), redes sociais e CRMs (“Serviços”).
                </p>
                <p>
                  2.2. As funcionalidades disponíveis podem variar por plano, versão, região e integrações ativas.
                  Ferramentas de terceiros podem exigir credenciais, aprovações, permissões e/ou contratação adicional
                  pelo Cliente.
                </p>
              </section>

              {/* 3 */}
              <section id="sec-3" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                  3. Conta, Elegibilidade e Responsabilidades do Cliente
                </h2>
                <p>3.1. O Cliente deve ter capacidade civil e poderes para contratar em nome próprio ou da pessoa jurídica que representa.</p>
                <p>
                  3.2. O Cliente é responsável por: (a) veracidade dos dados do cadastro; (b) guarda de logins, senhas e chaves de API;
                  (c) uso adequado da Plataforma por seus usuários internos; (d) configurações de chatbots, fluxos e mensagens;
                  (e) conformidade com leis e políticas dos canais integrados (incluindo diretrizes do WhatsApp Business/Meta)
                </p>
                <p>
                  3.3. O Cliente reconhece que irregularidades (ex.: spam, listas não autorizadas, mensagens fora das janelas/templated messages,
                  conteúdo proibido) podem ocasionar limitações, suspensão ou bloqueios pelos provedores de canal. Em tais casos, a Talker Flow
                  poderá suspender o uso para mitigar riscos de sanções externas.
                </p>
              </section>

              {/* 4 */}
              <section id="sec-4" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">4. Uso Permitido e Proibições</h2>
                <p>
                  4.1. É vedado: (a) violar leis aplicáveis (ex.: LGPD, Marco Civil, CDC); (b) infringir direitos de terceiros;
                  (c) coletar/usar dados sem base legal; (d) enviar conteúdo ilícito, discriminatório, abusivo, enganoso ou que infrinja
                  políticas de canais; (e) engenharia reversa, scraping indevido, ataques de segurança ou uso para fins não autorizados.
                </p>
                <p>4.2. A Talker Flow pode investigar violações e adotar medidas cabíveis, incluindo suspensão ou encerramento de contas.</p>
              </section>

              {/* 5 */}
              <section id="sec-5" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">5. Planos, Preços e Pagamentos</h2>
                <p>5.1. Salvo pactuação diversa, a contratação é por assinatura mensal, cobrada antecipadamente a cada ciclo (“Mensalidade”).</p>
                <p>
                  5.2. Inadimplência: o não pagamento na data de vencimento poderá acarretar suspensão automática do acesso e dos Serviços
                  a partir do 5º (quinto) dia após o vencimento, permanecendo a obrigação de pagamento dos valores devidos até a regularização.
                  A reativação pode depender da quitação e/ou taxa de reativação.
                </p>
                <p>5.3. Os valores não são reembolsáveis por períodos utilizados parcialmente, salvo disposição legal em contrário.</p>
                <p>5.4. Impostos, taxas e retenções ficam a cargo de quem a lei indicar.</p>
                <p>5.5. A Talker Flow pode atualizar preços ou planos mediante aviso prévio razoável para o ciclo subsequente.</p>
              </section>

              {/* 6 */}
              <section id="sec-6" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">6. Upgrades e Downgrades</h2>
                <p>
                  6.1. Upgrades passam a valer imediatamente (ou no ciclo seguinte, conforme política comercial). Downgrades entram em vigor
                  no ciclo subsequente e podem implicar perda de funcionalidades/limites.
                </p>
              </section>

              {/* 7 */}
              <section id="sec-7" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">7. Integrações com Terceiros</h2>
                <p>
                  7.1. A Plataforma pode integrar-se a serviços de terceiros (ex.: Meta/WhatsApp Business API, Instagram, CRMs).
                  Tais serviços possuem termos e políticas próprios e podem sofrer alterações unilaterais pelo respectivo provedor.
                </p>
                <p>
                  7.2. O Cliente é responsável por obter autorizações, templates, números e conformidade de uso. A Talker Flow não responde
                  por indisponibilidades, alterações de regras, bloqueios ou custos impostos por terceiros.
                </p>
              </section>

              {/* 8 */}
              <section id="sec-8" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">8. Proteção de Dados e Privacidade (LGPD)</h2>
                <p>8.1. As Partes observarão a Lei nº 13.709/2018 (LGPD) e demais normas aplicáveis.</p>
                <p>
                  8.2. Em fluxos típicos de atendimento, o Cliente atua como Controlador e a Talker Flow como Operadora,
                  tratando dados por conta e ordem do Cliente, conforme instruções documentadas.
                </p>
                <p>
                  8.3. A Talker Flow adotará medidas técnicas e administrativas de segurança compatíveis com o mercado para proteger
                  dados pessoais sob seu controle, considerando a natureza das operações.
                </p>
                <p>
                  8.4. O Cliente declara possuir base legal para os tratamentos realizados (ex.: consentimento, execução de contrato,
                  legítimo interesse, etc.) e obriga-se a respeitar direitos dos titulares, prazos de retenção e deveres de transparência.
                </p>
                <p>
                  8.5. Encerrado o contrato, a Talker Flow, observados prazos legais e regulatórios, eliminará ou devolverá ao Cliente os
                  dados pessoais tratados como Operadora, ressalvadas cópias de backup e logs mantidos por obrigação legal/defesa de direitos,
                  pelo período estritamente necessário.
                </p>
                <p>8.6. O detalhamento de papéis, medidas de segurança, prazos e subprocessadores pode constar em Acordo de Operação de Dados (DPA) anexo, quando aplicável.</p>
              </section>

              {/* 9 */}
              <section id="sec-9" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">9. Conteúdos, Titularidade e Licenças</h2>
                <p>
                  9.1. Do Cliente. Dados, listas, mensagens, arquivos, fluxos, prompts, templates e demais materiais fornecidos pelo Cliente
                  continuam sendo de titularidade do Cliente. O Cliente concede à Talker Flow licença não exclusiva para processá-los
                  exclusivamente para execução dos Serviços.
                </p>
                <p>
                  9.2. Da Talker Flow. A Plataforma, seu código, marcas, layouts, bancos de dados e documentações permanecem de titularidade
                  exclusiva da Talker Flow e são protegidos por direitos de propriedade intelectual.
                </p>
                <p>9.3. É proibida a reprodução, modificação, distribuição ou criação de obras derivadas da Plataforma sem autorização escrita.</p>
              </section>

              {/* 10 */}
              <section id="sec-10" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">10. Disponibilidade, Suporte e Manutenção</h2>
                <p>
                  10.1. A Talker Flow envidará esforços comercialmente razoáveis para manter os Serviços disponíveis e seguros.
                  Eventuais janelas de manutenção poderão ocorrer, preferencialmente fora de horários de pico.
                </p>
                <p>10.2. O suporte é prestado nos canais e horários divulgados comercialmente e pode variar por plano contratado.</p>
              </section>

              {/* 11 */}
              <section id="sec-11" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                  11. Garantias, Isenções e Limites de Responsabilidade
                </h2>
                <p>11.1. Os Serviços são fornecidos “no estado em que se encontram” e “conforme disponibilidade”.</p>
                <p>
                  11.2. A Talker Flow não garante: (a) resultados específicos; (b) funcionamento ininterrupto ou livre de erros;
                  (c) compatibilidade com todo e qualquer sistema/terceiro; (d) ausência de bloqueios/limitações por provedores externos.
                </p>
                <p>
                  11.3. Limitação. Salvo em casos de dolo, culpa grave ou obrigações legais não excludentes, a responsabilidade total
                  da Talker Flow por danos diretos fica limitada ao montante efetivamente pago pelo Cliente nos últimos 3 (três) meses
                  anteriores ao evento. Danos indiretos (ex.: lucros cessantes, perda de dados não atribuível à Talker Flow, perda de chance)
                  ficam excluídos na máxima extensão permitida.
                </p>
              </section>

              {/* 12 */}
              <section id="sec-12" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">12. Indenização</h2>
                <p>
                  12.1. O Cliente concorda em indenizar a Talker Flow por perdas, danos, custos e despesas decorrentes de: (a) uso indevido da
                  Plataforma; (b) violações a estes Termos; (c) descumprimento de leis/políticas dos canais; (d) conteúdos e dados fornecidos pelo Cliente.
                </p>
              </section>

              {/* 13 */}
              <section id="sec-13" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">13. Vigência, Cancelamento e Rescisão</h2>
                <p>13.1. O contrato vige por prazo indeterminado enquanto houver assinatura ativa.</p>
                <p>
                  13.2. O Cliente pode cancelar a assinatura a qualquer tempo, com efeitos ao final do ciclo vigente (salvo condição comercial diversa).
                  Valores já pagos não são reembolsáveis.
                </p>
                <p>
                  13.3. A Talker Flow pode rescindir ou suspender o acesso por: (a) inadimplência (Cláusula 5); (b) violação a estes Termos;
                  (c) ordem legal; (d) risco à segurança/estabilidade do serviço.
                </p>
                <p>
                  13.4. Efeitos da rescisão: cessado o contrato, serão interrompidos os acessos aos Serviços e, nos prazos legais, adotados os procedimentos
                  de eliminação/devolução de dados conforme Cláusula 8.5.
                </p>
              </section>

              {/* 14 */}
              <section id="sec-14" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">14. Comunicações e Notificações</h2>
                <p>14.1. Comunicados operacionais poderão ocorrer por e-mail cadastrado, painel administrativo ou canais de suporte.</p>
                <p>14.2. Notificações formais devem ser enviadas para os endereços informados no preâmbulo destes Termos.</p>
              </section>

              {/* 15 */}
              <section id="sec-15" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">15. Anticorrupção e Conformidade</h2>
                <p>15.1. As Partes declaram observar a legislação anticorrupção aplicável e não oferecer/solicitar vantagens indevidas.</p>
                <p>15.2. A Talker Flow poderá encerrar a relação contratual caso identifique violação a esta cláusula.</p>
              </section>

              {/* 16 */}
              <section id="sec-16" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">16. Alterações dos Termos</h2>
                <p>16.1. A Talker Flow poderá atualizar estes Termos para refletir mudanças legais, técnicas ou operacionais.</p>
                <p>
                  16.2. Alterações relevantes serão comunicadas com antecedência razoável e passarão a valer no ciclo de faturamento seguinte
                  ou em prazo indicado na própria comunicação. O uso contínuo da Plataforma após a vigência das alterações implica concordância.
                </p>
              </section>

              {/* 17 */}
              <section id="sec-17" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">17. Disposições Gerais</h2>
                <p>17.1. Independência das cláusulas. A nulidade de uma cláusula não invalida as demais.</p>
                <p>
                  17.2. Cessão. O Cliente não pode ceder estes Termos sem anuência da Talker Flow; a Talker Flow pode ceder no contexto de
                  reestruturação societária.
                </p>
                <p>
                  17.3. Lei e Foro. Aplica-se a legislação brasileira. Fica eleito o foro da Comarca de São Paulo/SP, com renúncia a qualquer outro,
                  por mais privilegiado que seja, salvo foro legal de consumidor quando aplicável.
                </p>
              </section>

              {/* CTA final */}
              <section className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-dark mb-1">Ficou com dúvidas?</h3>
                  <p className="text-neutral-700">Fale com nosso suporte para entender como os Termos se aplicam ao seu uso.</p>
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

export default TermosDeUso;