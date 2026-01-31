// Use dynamic import to avoid SSR/bundler interop issues and ensure client-only usage
export async function downloadElementAsPDF(element, filename = 'resume.pdf') {
  if (!element) return;
  const { default: html2pdf } = await import('html2pdf.js');
  // Small delay to ensure images/fonts are painted
  await new Promise((r) => setTimeout(r, 50));
  const opt = {
    margin: 0.4, // ~10mm
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] },
  };
  try {
    await html2pdf().set(opt).from(element).save();
  } catch (e) {
    console.error('PDF generation failed', e);
  }
}
