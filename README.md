## Anggota Kelompok
Jeremy James | 5025221139 <br>
Putu Indra Mahendra | 5025221215

## Overview
Kami membuat website e-commerce untuk sebuah toko kue bernama Toko Pak Budi. Halaman dari web kami ada Dashboard, Products (Listing), Manage Products, Product (Single),  Supplier. Untuk BE menggunakan Go dan Gin, sedangkan untuk FE menggunakan React.

## Penjelasan API

## Penerapan API per Halaman
### Dashboard
![image](https://github.com/user-attachments/assets/11e0d50f-d903-4488-aeb0-7ac75bb910d7)
Tidak ada penerapan API pada Dashboard.

### Products Listing
![image](https://github.com/user-attachments/assets/62b4a087-976c-475b-a850-f4127aad3f18)
Pemanggilan `http://localhost:8080/kue/all` untuk mendapatkan data semua kue dan ditampilkan datanya dalam card.

### Manage Products
![image](https://github.com/user-attachments/assets/25b6a1f8-fddd-4a78-8b91-beed3dcae91d)
Pemanggilan `http://localhost:8080/kue/all`, `http://localhost:8080/supplier/all`, dan `http://localhost:8080/varians/all` untuk mendapatkan data semua kue, supplier, dan varian.

Penambahan product (function handleConfirmAdd):
Pemanggilan `http://localhost:8080/upload` untuk menerima gambar, dan data ditambahkan ke database dengan `http://localhost:8080/kue/add`.

Penghapusan product (function handleDelete):
Pemanggilan `http://localhost:8080/kue/delete/${id}` untuk delete satu row by product ID.

Pembaruan product (function handleSave):
Pemanggilan `http://localhost:8080/upload` untuk menerima gambar baru, dan row diupdate ke database dengan `http://localhost:8080/kue/update/${id}`.

### Products (Single)
![image](https://github.com/user-attachments/assets/a1155710-076a-4c2a-89f4-a15cb957446e)
Pemanggilan `http://localhost:8080/kue/${id}`, `http://localhost:8080/supplier/all`, dan `http://localhost:8080/varians/all` untuk mendapatkan data sebuah kue, semua data supplier, dan semua data varian.

### Supplier
![image](https://github.com/user-attachments/assets/4a3fff0f-33a9-4490-a7c4-2d3e3f272d1c)
Pemanggilan `http://localhost:8080/supplier/all` untuk mendapatkan data semua supplier dan ditampilkan datanya dalam grid.

## Link Video
https://youtu.be/gyj3b2Dy8o0
