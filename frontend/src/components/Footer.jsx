const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      <p>&copy; {new Date().getFullYear()} MERNCommerce. Built for Scale.</p>
    </footer>
  );
};

export default Footer;
