export default {
  render(e) {
    return e('div', { staticClass: 'boxes' }, [
      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Tombol')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('p', 'Tombol dengan style biasa itu diberi beberapa sentuhan agar sesuai dengan kriteria desain materialnya Google. Semua warna pada tombol-tombol ini diambil dari peletnya Google juga.'),
          e('div', {
            attrs: { style: 'white-space: nowrap; overflow-x: auto; overflow-y: hidden; margin: 32px 0px;' }
          }, [
              e('button', { staticClass: 'button' }, [
                e('span', 'Batal')
              ]),
              e('button', { staticClass: 'button is-primary' }, [
                e('span', 'Simpan')
              ]),
              e('button', { staticClass: 'button is-positive' }, [
                e('span', 'Tambah')
              ]),
              e('button', { staticClass: 'button is-negative' }, [
                e('span', 'Hapus')
              ])
            ]),
          e('p', 'Satu hal yang membedakan dari desain material adalah pada state active nya yang menggunakan efek transform scale. Alasannya adalah agar terlihat lebih interaktif dan tidak mati. Untuk catatan bahwa efek ini melanggar panduan desain material.')
        ]),
      ]),

      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Contoh Tombol dengan Icon')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('div', {
            attrs: { style: 'white-space: nowrap; overflow-x: auto; overflow-y: hidden; margin: 32px 0px;' }
          }, [
              e('button', { staticClass: 'button' }, [
                e('i', { staticClass: 'icon material-icons' }, 'cancel'),
                e('span', 'Batal')
              ]),
              e('button', { staticClass: 'button is-primary' }, [
                e('i', { staticClass: 'icon material-icons' }, 'save'),
                e('span', 'Simpan')
              ]),
              e('button', { staticClass: 'button is-positive' }, [
                e('i', { staticClass: 'icon material-icons' }, 'add_box'),
                e('span', 'Tambah')
              ]),
              e('button', { staticClass: 'button is-negative' }, [
                e('i', { staticClass: 'icon material-icons' }, 'delete'),
                e('span', 'Hapus')
              ])
            ])
        ])
      ]),
    ])
  }
}
