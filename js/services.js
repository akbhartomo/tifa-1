angular.module('starter.services', [])

.factory('Groups', function() {

var group1 = [
  {
    type: 'text',
    name: 'fullName',
    label: 'Nama Sesuai KTP/Paspor',
    maxlength: 60,
  },
  {
    type: 'number',
    name: 'npwpNumber',
    label: 'Nomor NPWP',
    maxDigit: 15,
  },
  {
    label: 'Tipe Identitas',
    type: 'select',
    name: 'idType',
    options: [
      {
        label: 'KTP',
        value: 'KTP',
      },
      {
        label: 'Paspor',
        value: 'PASSPORT',
      },
    ]
  },
  {
    type: 'text',
    name: 'idNumber',
    label: 'Nomor KTP/Paspor',
    maxlength: 30,
  },
  {
    type: 'date',
    name: 'idValidityPeriod',
    label: 'Masa Berlaku KTP/Paspor',
    default: '1900-01-01'
  },  
  {
    type: 'text',
    name: 'birthPlace',
    label: 'Tempat Lahir',
    placeholder: '',
    maxlength: 30,
  },
  {
    type: 'date',
    name: 'birthDate',
    label: 'Tanggal Lahir',
    default: '1900-01-01'
  },
  {
    label: 'Jenis Kelamin',
    type: 'select',
    name: 'gender',
    options: [
      {
        label: 'Pria',
        value: 'MALE',
      },
      {
        label: 'Wanita',
        value: 'FEMALE',
      }
    ]
  },
  {
    label: 'Nama Ibu Kandung',
    type: 'text',
    name:'biologicalMotherName',
    maxlength: 30,
  },  
  {
    type: 'email',
    name: 'username',
    label: 'Alamat Email',
    maxlength: 50,
  },
  {
    label: 'Pendidikan',
    type: 'select',
    name: 'education',
    options: [
      {
        label: 'Tanpa Gelar',
        value: 'TANPA_GELAR',
      },
      {
        label: 'Diploma 1',
        value: 'DIPLOMA_1',
      },
      {
        label: 'Diploma 2',
        value: 'DIPLOMA_2',
      },
      {
        label: 'Diploma 3',
        value: 'DIPLOMA_3',
      },
      {
        label: 'S1',
        value: 'S1',
      },
      {
        label: 'S2',
        value: 'S2',
      },
      {
        label: 'S3',
        value: 'S3',
      },
      {
        label: 'Lainnya',
        value: 'LAINNYA',
      },
    ]
  },
  {
    label: 'Status Perkawinan',
    type: 'select',
    name: 'maritalStatus',
    options: [
      {
        label: 'Belum Kawin',
        value: 'S',
      },
      {
        label: 'Kawin',
        value: 'M',
      },
      {
        label: 'Cerai',
        value: 'D',
      },
    ],
    nonNullItemName: 'spouseName',
    whenValue: ['M'],
  },
  {
    type: 'text',
    name: 'spouseName',
    label: 'Nama Pasangan Sesuai KTP/Paspor',
    maxlength: 35,
  },
  {
    type: 'number',
    name: 'countOfFamilyOrExpense',
    label: 'Jumlah Tanggungan',
    minimum: 0,
    maxDigit: 2,
    exclusiveMinimum: 'true',
  },
  {
    label: 'Kode Pekerjaan',
    type: 'select',
    name: 'occupation',
    options: [
      {
        label: 'Pengajar (Guru, Dosen)',
        value: 'PENGAJAR',
      },
      {
        label: 'Buruh (Pabrik, Bangunan, Tani)',
        value: 'BURUH',
      },      
      {
        label: 'Transportasi Darat',
        value: 'TRANSPORTASI_DARAT',
      },
      {
        label: 'Pekerja Informal',
        value: 'PEKERJA_INFORMAL',
      },
      {
        label: 'Tenaga Medis',
        value: 'TENAGA_MEDIS',
      },
      {
        label: 'Pengamanan',
        value: 'PENGAMANAN',
      },      
      {
        label: 'Lain-lain',
        value: 'LAIN_LAIN',
      },
    ]
  },
  {
    type: 'number',
    name: 'handphoneNumber',
    label: 'Nomor Handphone',
    maxDigit: 15,
  },
  {
    label: 'Lanjutkan',
    type: 'button',
  },
];

var group2 = [
  {
    type: 'lookup',
    name: 'domisiliProvinsi',
    id: 'domisiliProvinsi',
    label: 'Provinsi',
  },
  {
    type: 'lookup',
    name: 'domisiliKota',
    id: 'domisiliKota',
    label: 'Kota',
  },
  {
    type: 'lookup',
    name: 'domisiliKecamatan',
    id: 'domisiliKecamatan',
    label: 'Kecamatan',
  },
  {
    type: 'lookup',
    name: 'domisiliKelurahan',
    id: 'domisiliKelurahan',
    label: 'Kelurahan',
  },
  {
    type: 'lookup',
    name: 'domisiliZipCode',
    id: 'domisiliZipCode',
    label: 'Kode Pos',
  },
  {
    type: 'number',
    name: 'domisiliRt',
    label: 'RT',
    maxDigit: 5,
  },
  {
    type: 'number',
    name: 'domisiliRw',
    label: 'RW',
    maxDigit: 5,
  },
  {
    type: 'text',
    name: 'domisiliAlamat',
    label: 'Alamat Tempat Tinggal Sekarang',
    maxlength: 40,
  },
  {
    type: 'number',
    name: 'homephoneNumberArea',
    label: 'Kode Area Telepon Rumah',
    maxDigit: 5,
  },
  {
    type: 'number',
    name: 'homephoneNumber',
    label: 'Telepon Rumah',
    maxDigit: 15,
  },
  {
    label: 'Status Kepemilikan Tempat Tinggal',
    type: 'select',
    name: 'houseOwnership',
    options: [
      {
        label: 'Milik Sendiri',
        value: 'MILIK_SENDIRI',
      },
      {
        label: 'Milik Orangtua/Keluarga/Instansi',
        value: 'RUMAH_INSTANSI',
      },
      {
        label: 'Kost/Kontrak',
        value: 'KONTRAK',
      },
      {
        label: 'Angsuran KPR',
        value: 'ANGSURAN_KPR',
      },
    ]
  },
  {
    label: 'Lama Menempati',
    type: 'select',
    name: 'occupateDurationOfResidence',
    options: [
      {
        label: '1 tahun',
        value: 'ONE_YEAR',
      },
      {
        label: '2 tahun',
        value: 'TWO_YEARS',
      },
      {
        label: '3 tahun',
        value: 'THREE_YEARS',
      },
      {
        label: '> 3 tahun',
        value: 'MORE_THAN_THREE_YEARS',
      },
    ]
  },
  {
    label: 'Lanjutkan',
    type: 'button',
  },
];  

var group3 = [
  {
    name: 'companyName',
    label: 'Nama Perusahaan',
    type: 'text',
    maxlength: 35,
  },
  {
    name: 'nik',
    disabled: 'true',
    label: 'Nomor Induk Karyawan',
    type: 'text',
    maxDigit: 30,
  },
  {
    type: 'lookup',
    name: 'companyProvince',
    id: 'companyProvinsi',
    label: 'Provinsi Perusahaan',
  },
  {
    type: 'lookup',
    name: 'companyCity',
    id: 'companyKota',
    label: 'Kota Perusahaan',
  },
  {
    type: 'lookup',
    name: 'companyDistrict',
    id: 'companyKecamatan',
    label: 'Kecamatan Perusahaan',
  },
  {
    type: 'lookup',
    name: 'companySubdistrict',
    id: 'companyKelurahan',
    label: 'Kelurahan Perusahaan',
  },
  {
    type: 'lookup',
    name: 'companyZipcode',
    id: 'companyZipcode',
    label: 'Kode Pos Perusahaan',
  },
  {
    type: 'number',
    name: 'companyRt',
    label: 'RT Perusahaan',
    maxDigit: 5,
  },
  {
    type: 'number',
    name: 'companyRw',
    label: 'RW Perusahaan',
    maxDigit: 5,
  },
  {
    name: 'companyAddress',
    label: 'Alamat Perusahaan',
    type: 'text',
    maxlength: 40,
  },
  {
    label: 'Bidang Usaha',
    name: 'companyType',
    type: 'select',
    options: [
      {
        label: 'Industri Rokok',
        value: 'INDUSTRI_ROKOK',
      },
      {
        label: 'Industri Pakaian Jadi dan Perlengkapannya',
        value: 'INDUSTRI_PAKAIAN_JADI_DAN_PERLENGKAPANNYA',
      },
      {
        label: 'Industri Makanan Lainnya',
        value: 'INDUSTRI_MAKANAN_LAINNYA',
      },
      {
        label: 'Industri Plastik dan Karet Buatan',
        value: 'INDUSTRI_PLASTIK_DAN_KARET_BUATAN',
      },
      {
        label: 'Industri Pengolahan Lainnya',
        value: 'INDUSTRI_PENGOLAHAN_LAINNYA',
      },
      {
        label: 'Bangunan Jalan dan Jembatan Kereta Api',
        value: 'BANGUNAN_JALAN_DAN_JEMBATAN_KERETA_API',
      },
    ]
  },
  {
    label: 'Golongan Debitur',
    name: 'debiturType',
    type: 'select',
    options: [
      {
        label: 'Perusahaan Tekstil (Swasta Nasional)',
        value: 'PERUSAHAAN_TEKSTIL_SWASTA_NASIONAL',
      },
      {
        label: 'Perusahaan Jasa Konstruksi (Swasta Nasional)',
        value: 'PERUSAHAAN_JASA_KONSTRUKSI_SWASTA_NAIONAL',
      },
      {
        label: 'Perusahaan Industri Makanan (Swasta nasional)',
        value: 'PERUSAHAAN_INDUSTRI_MAKANAN_SWASTA_NASIONAL',
      },
      {
        label: 'Lembaga Pendidikan (Swasta Nasional)',
        value: 'LEMBAGA_PENDIDIKAN_SWASTA_NASIONAL',
      },
      {
        label: 'Perusahaan Lainnya',
        value: 'PERUSAHAAN_LAINNYA',
      },
    ]
  },
  {
    name: 'yearofWork',
    label: 'Lama Bekerja (tahun)',
    type: 'number',
    maxDigit: 2,
  },
  {
    label: 'Sumber Penghasilan',
    type: 'select',
    name: 'sourceOfIncomeType',
    options: [
      {
        label: 'Gaji',
        value: 'GAJI',
      },
      {
        label: 'Lainnya',
        value: 'LAINNYA',
      },
    ]
  },
  {
    label: 'Penghasilan Pertahun / Rupiah',
    type: 'inquirenumber',
    name: 'incomePerYear',
    maxDigit: 19,
  },
  {
    label: 'Lanjutkan',
    type: 'button',
  },
];  

var group4 = [
  {
    label: 'Penyedia Barang/Jasa',
    type: 'selectUpdate',
    name: 'productSupplier',
    // options: [
    //   {
    //     "cooperativeTifaId": '2',
    //     label: 'Koperasi Berlina',
    //     value: '1001',
    //     "tenorRate": [
    //       {
    //         "cooperativeTifaTenorRateId": 4,
    //         "rate": 15,
    //         label: '36 bulan',
    //         "tenor": '36 bulan'
    //       }
    //     ]
    //   },
    //   {
    //     "cooperativeTifaId": '1',
    //     label: 'Koperasi Yan',
    //     value: 'koperasiyancode',
    //     "tenorRate": [
    //       {
    //         "cooperativeTifaTenorRateId": 1,
    //         "rate": 5,
    //         label: '12 bulan',
    //         "tenor": '12 bulan'
    //       },
    //       {
    //         "cooperativeTifaTenorRateId": 2,
    //         "rate": 10,
    //         label: '24 bulan',
    //         "tenor": '24 bulan'
    //       },
    //       {
    //         "cooperativeTifaTenorRateId": 3,
    //         "rate": 15,
    //         label: '36 bulan',
    //         "tenor": '36 bulan'
    //       }
    //     ]
    //   }
    // ]
  },
  {
    label: 'Harga Barang/Jasa',
    name: 'totalProductPrice',
    type: 'inquirenumber',
    maxDigit: 19,
  },
  {
    label: 'Jumlah Dana yang dibutuhkan',
    name: 'totalLoan',
    type: 'inquirenumber',
    maxDigit: 19,
  },
  {
    label: 'Jangka Waktu Angsuran',
    type: 'inquireselect',
    name: 'installmentPeriod',
    // options: [
    //   {
    //     label: '12 Bulan',
    //     value: '12',
    //   },
    //   {
    //     label: '24 Bulan',
    //     value: '24',
    //   },
    //   {
    //     label: '36 Bulan',
    //     value: '36',
    //   },
    // ]
  },
  {
    label: 'Rate Bunga (%)',
    name: 'interestRate',
    type: 'text',
    disabled: 'true',
  },
  {
    label: 'Margin',
    hidden: 'true',
    disabled: 'true',
    name: 'profitMargin',
    type: 'text',
    maxDigit: 9,
  },
  {
    label: 'Besar Angsuran',
    disabled: 'true',
    name: 'installmentAmount',
    type: 'text',
    maxDigit: 9,
  },
  {
    label: 'Biaya Administrasi',
    disabled: 'true',
    name: 'installmentAdminFee',
    type: 'text',
    maxDigit: 9,
  },
  {
    label: 'Tujuan Penggunaan Dana',
    type: 'select',
    name: 'loanPurpose',
    options: [
      {
        label: 'Umroh/Naik Haji/Ziarah',
        value: 'Umroh',
      },
      {
        label: 'Biaya Pendidikan',
        value: 'Biaya_Pendidikan',
      },
      {
        label: 'Kebutuhan Medis',
        value: 'Kebutuhan_Medis',
      },
      {
        label: 'Biaya Pernikahan',
        value: 'Biaya_Pernikahan',
      },
      {
        label: 'Renovasi Rumah',
        value: 'Renovasi_Rumah',
      },
      {
        label: 'Pembelian Barang',
        value: 'Pembelian_Barang',
      },
      {
        label: 'Lain lain',
        value: 'Lain_Lain',
      },
    ],
    nonNullItemName: 'loanPurposeValue',
    whenValue: ['Pembelian_Barang', 'Lain_Lain'],
  },
  {
    label: 'Nama Barang / Keterangan',
    name: 'loanPurposeValue',
    type: 'text',
    maxlength: 60,
  },
  {
    label: 'Lanjutkan',
    type: 'button',
  },
];  
        
var group5 = [
  {
    label: 'Nama Bank',
    name: 'supplierBankName',
    disabled: 'true',
    type: 'text',
    maxlength: 173,
  },
  {
    label: 'No. Rekening',
    name: 'supplierBankAcountNumber',
    disabled: 'true',
    type: 'number',
    maxDigit: 173,
  },
  {
    label: 'Nama Pemegang Rekening',
    name: 'supplierBankAccountName',
    disabled: 'true',
    type: 'text',
    maxlength: 173,
  },
];

  return {
    group1: function() {return group1;},
    group2: function() {return group2;},
    group3: function() {return group3;},
    group4: function() {return group4;},
    group5: function() {return group5;},
  };
});