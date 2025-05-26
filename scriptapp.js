function formatRupiah(angka) {
  angka = angka.replace(/[^0-9]/g, '');
  return angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseRupiah(str) {
  return parseInt(str.replace(/\./g, '')) || 0;
}

function formatAndCalculate() {
  const uangKembalian = document.getElementById("uangKembalian");
  uangKembalian.value = formatRupiah(uangKembalian.value);

  const pendapatanTotal = document.getElementById("pendapatanTotal");
  pendapatanTotal.value = formatRupiah(pendapatanTotal.value);

  hitungTotal();
}

function hitungTotal() {
  const inputs = document.querySelectorAll("#belanjaan input.harga");
  let total = 0;
  inputs.forEach(input => {
    input.value = formatRupiah(input.value);
    total += parseRupiah(input.value);
  });

  document.getElementById("totalBelanja").innerText = `Rp ${formatRupiah(total.toString())}`;

  const uang = parseRupiah(document.getElementById("uangKembalian").value);
  const kembalian = uang - total;
  document.getElementById("kembalian").innerText = `Rp ${formatRupiah(kembalian.toString())}`;
}

function updateWaktu() {
  const now = new Date();
  const waktuStr = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID');
  document.getElementById("waktu").innerText = waktuStr;
}

function generatePNG() {
  updateWaktu();
  html2canvas(document.body).then(canvas => {
    const link = document.createElement("a");
    const now = new Date();
    const filename = `nota_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}.png`;
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("belanjaan");
  for (let i = 1; i <= 5; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i}</td>
      <td><input type="text" placeholder="Nama barang" /></td>
      <td><input type="text" class="harga" oninput="formatAndCalculate()" /></td>
    `;
    tbody.appendChild(tr);
  }
});