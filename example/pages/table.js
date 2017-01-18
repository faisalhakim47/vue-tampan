export default {
  data() {
    const people = []
    for (let i = 0; i < 100; i++) {
      people.push({
        keyforitem: faker.random.uuid(),
        name: faker.name.findName(),
        date: faker.date.past(),
        city: faker.address.city(),
        department: faker.commerce.department()
      })
    }
    return {
      people
    }
  },
  computed: {
    filteredPeople() {
      return this.people.slice(this.peopleAttr.skip, this.peopleAttr.limit)
    }
  },
  render(e) {
    return e('div', { staticClass: 'boxes' }, [
      e('div', { staticClass: 'boxes-header' }, [
        e('h2', { staticClass: 'boxes-title' }, 'Tabel')
      ]),
      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Tabel Normal')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('table-view', {
            props: {
              items: this.people,
              key: item => item.keyforitem,
              columnMap: {
                'Nama': item => item.name,
                'Tanggal': item => item.date.toString(),
                'Kota': item => item.city,
                'Departemen': item => item.department,
                'Show': [
                  {
                    iconClass: 'material-icons',
                    iconText: 'show',
                    callback: () => this.$tampan.alert({ title: 'Halo', text: JSON.stringify(item, null, 2) })
                  }
                ]
              }
            }
          })
        ])
      ])
    ])
  }
}
