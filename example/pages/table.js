import { tableViewDataFactory, loadAsyncRouteData } from '../../src/index'

const people = []
for (let i = 0; i < 20; i++) {
  people.push({
    keyforitem: faker.random.uuid(),
    name: faker.name.findName(),
    date: faker.date.past(),
    city: faker.address.city(),
    department: faker.commerce.department()
  })
}

const peopleReq = {
  req: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(people)
    }, 2000)
  }),
  map: (vm, result) => vm.people = result
}

export default {
  data() {
    return {
      people: []
    }
  },
  beforeRouteEnter: loadAsyncRouteData([
    peopleReq
  ]),
  render(e) {
    return e('div', { staticClass: 'boxes' }, [
      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Tabel Normal')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('table-view', {
            props: {
              defaultRowLimit: 5,
              key: item => item.keyforitem,
              dataProvider: tableViewDataFactory({
                items: this.people
              }),
              columnMap: {
                'Nama': item => item.name,
                'Tanggal': item => item.date.toString(),
                'Kota': item => item.city,
                'Departemen': item => item.department
              },
              onRowClick: item => this.$tampan.alert({
                text: JSON.stringify(item)
              }),
            },
          })
        ])
      ])
    ])
  }
}
