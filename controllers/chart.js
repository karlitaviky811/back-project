'use strict'
const { request } = require('express');
var validator = require('validator');
var Request = require('../models/request')
var Project = require('../models/project');
var Qrs = require('../models/qrs');
var controller = {
    test: function (req, res) {
        return res.status(200).send({
            message: "Método test de añadir comentario"
        })
    }
    ,
    obtain: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }

            let i = 1;
            let months = 13;
            let cont = 0;
            let arrReqMont = [];

            for (i = 1; i < months; i++) {

                qrs.docs.forEach(element => {
                    const month = element.date.getMonth() + 1;
                    console.log(i, month, element)
                    if (i == month) {
                        cont++
                    }
                });
                let obj = {
                    month: i,
                    reqs: cont
                }
                arrReqMont.push(cont)
                cont = 0;

            }
            let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']

            return res.status(200).send({
                status: 'success',
                data: {
                    labels: arrM,
                    series: arrReqMont
                },

            })

        })


    },
    obtain: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }

            let i = 1;
            let months = 13;
            let cont = 0;
            let arrReqMont = [];

            for (i = 1; i < months; i++) {

                qrs.docs.forEach(element => {
                    const month = element.date.getMonth() + 1;
                    console.log(i, month, element)
                        if (i == month) {
                            cont++
                        }
                });
                let obj = {
                    month: i,
                    reqs: cont
                }
                arrReqMont.push(cont)
                cont = 0;

            }
            let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']

            return res.status(200).send({
                status: 'success',
                data: {
                    labels: arrM,
                    series: arrReqMont
                },

            })

        })


    },
    obtainRejected: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }

            let i = 1;
            let months = 13;
            let cont = 0;
            let arrReqMont = [];

            for (i = 1; i < months; i++) {

                qrs.docs.forEach(element => {
                    const month = element.date.getMonth() + 1;
                    console.log(i, month, element)
                    if(element.status == 'Rejected'){
                        if (i == month) {
                            cont++
                        }
                    }
                    
                });
                let obj = {
                    month: i,
                    reqs: cont
                }
                arrReqMont.push(cont)
                cont = 0;

            }
            let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']

            return res.status(200).send({
                status: 'success',
                data: {
                    labels: arrM,
                    series: arrReqMont
                },

            })

        })


    },
    obtainAcepted: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }

            let i = 1;
            let months = 13;
            let cont = 0;
            let arrReqMont = [];

            for (i = 1; i < months; i++) {

                qrs.docs.forEach(element => {
                    const month = element.date.getMonth() + 1;
                    console.log(i, month, element)
                    if(element.status == 'Approved'){
                        if (i == month) {
                            cont++
                        }
                    }
                    
                });
                let obj = {
                    month: i,
                    reqs: cont
                }
                arrReqMont.push(cont)
                cont = 0;

            }
            let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']

            return res.status(200).send({
                status: 'success',
                data: {
                    labels: arrM,
                    series: arrReqMont
                },

            })

        })


    },
    obtainReqStatus: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }



            let arrReqStatus = [];
            let status = ['Created', 'Review', 'Rejected', 'Approved']
            let cont = 0;


            status.forEach(e => {
                console.log(e)
                qrs.docs.forEach(element => {
                    console.log(e, element.status)

                    if (e == element.status) {
                        cont++;
                    }
                })

                let obj = {
                    status: e,
                    cont: cont
                }

                arrReqStatus.push(obj)
                cont = 0
            })
            return res.status(200).send({
                status: 'success',
                reqStatus: arrReqStatus,

            })

        })


    },

    obtainAceptedUser: function (req, res) {

        //Conseguir el id del usuario


        //Find condición usuario


        //Deevolver resultado
        var userId = req.params.user

        Request.find({
            user: userId
        })
            .sort([['date', 'descending']])
            .exec((err, requests) => {

                if (err) {
                    return res.status(500).send({
                        message: 'Error en la petición'
                    })
                }

                if (!requests) {
                    return res.status(500).send({
                        status: 'Error',
                        message: 'No hay solicitudes para mostrar'
                    })
                }

                console.log("requests",requests)
                let i = 1;
                let months = 13;
                let cont = 0;
                let arrReqMont = [];

                for (i = 1; i < months; i++) {

                    requests.forEach(element => {
                        const month = element.date.getMonth() + 1;
                        console.log(i, month, element)
                        if(element.status == 'Accepted'){
                            if (i == month) {
                                cont++
                            }
                        }
                        
                    });
                    let obj = {
                        month: i,
                        reqs: cont
                    }
                    arrReqMont.push(cont)
                    cont = 0;
                    
                }
                let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']

                return res.status(200).send({
                    status: 'success',
                    labels: arrM,
                    series: arrReqMont
                })
            })
    },

    obtainRejectedUser: function (req, res) {

        //Conseguir el id del usuario


        //Find condición usuario


        //Deevolver resultado
        var userId = req.params.user

        Request.find({
            user: userId
        })
            .sort([['date', 'descending']])
            .exec((err, requests) => {

                if (err) {
                    return res.status(500).send({
                        message: 'Error en la petición'
                    })
                }

                if (!requests) {
                    return res.status(500).send({
                        status: 'Error',
                        message: 'No hay solicitudes para mostrar'
                    })
                }

                console.log("requests",requests)
                let i = 1;
                let months = 13;
                let cont = 0;
                let arrReqMont = [];

                for (i = 1; i < months; i++) {

                    requests.forEach(element => {
                        const month = element.date.getMonth() + 1;
                        console.log(i, month, element)
                        if(element.status == 'Rejected'){
                            if (i == month) {
                                cont++
                            }
                        }
                        
                    });
                    let obj = {
                        month: i,
                        reqs: cont
                    }
                    arrReqMont.push(cont)
                    cont = 0;
                    
                }
                let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']

                return res.status(200).send({
                    status: 'success',
                    labels: arrM,
                    series: arrReqMont
                })
            })
    },

    obtainReqStatusMonthActuallyC: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }



            let arrReqStatus = [];
            let status = ['Created']
            let cont = 0;
            let today = new Date()

            status.forEach(e => {
                console.log(e)
                qrs.docs.forEach(element => {

                    if ((e == element.status) && (element.date.getMonth() + 1 == today.getMonth() + 1)) {
                        cont++;
                        console.log("here", cont)
                    }
                })

                let obj = {
                    status: e,
                    cont: cont
                }

                arrReqStatus.push(obj)
                cont = 0
            })
            return res.status(200).send({
                status: 'success',
                reqStatus: arrReqStatus,

            })

        })


    },
    obtainReqStatusMonthActuallyR: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }



            let arrReqStatus = [];
            let status = ['Rejected']
            let cont = 0;
            let today = new Date()

            status.forEach(e => {
                console.log(e)
                qrs.docs.forEach(element => {

                    if ((e == element.status) && (element.date.getMonth() + 1 == today.getMonth() + 1)) {
                        cont++;
                        console.log("here", cont)
                    }
                })

                let obj = {
                    status: e,
                    cont: cont
                }

                arrReqStatus.push(obj)
                cont = 0
            })
            return res.status(200).send({
                status: 'success',
                reqStatus: arrReqStatus,

            })

        })


    },
    obtainReqStatusMonthActuallyA: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }



            let arrReqStatus = [];
            let status = ['Approved']
            let cont = 0;
            let today = new Date()

            status.forEach(e => {
                console.log(e)
                qrs.docs.forEach(element => {

                    if ((e == element.status) && (element.date.getMonth() + 1 == today.getMonth() + 1)) {
                        cont++;
                        console.log("here", cont)
                    }
                })

                let obj = {
                    status: e,
                    cont: cont
                }

                arrReqStatus.push(obj)
                cont = 0
            })
            return res.status(200).send({
                status: 'success',
                reqStatus: arrReqStatus,

            })

        })


    },
    obtainReqProjectStatus: function (req, res) {

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }

        let arrReqStatus = [];
        Project.paginate({}, options, (err, prj) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!prj) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }




            let status = ['Approved']
            let cont = 0;
            let today = new Date()

            Request.find().exec((err, req) => {
                if (err || !req) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay usuarios que mostrar'
                    })
                }

                prj.docs.forEach(prj => {

                    console.log("prj", prj.title)

                    req.forEach(req => {
                        console.log("req", req.project)

                        if (prj.title == req.project && req.status == 'Created') {
                            cont++
                        }
                    })

                    let obj = {
                        name: prj.title,
                        cont: cont,
                        status: 'Created'
                    }
                    arrReqStatus.push(obj)
                    cont = 0;
                })



                return res.status(200).send({
                    status: 'success',
                    reqStatus: arrReqStatus,

                })

            })



        })








    },
    obtainReqProjectQRS: function (req, res) {

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }



            let arrReqStatus = [];
            let qrsT = ['Queja', 'Reclamo', 'Sugerencia']
            let cont = 0;

            let objT = {}

            Qrs.find().exec((err, qrs) => {
                if (err || !qrs) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay usuarios que mostrar'
                    })
                }


                Project.find().exec((err, prj) => {
                    if (err || !prj) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No hay proyectos que mostrar'
                        })
                    }
                    let info = []
                    prj.forEach(prj => {
                        qrs.forEach(qrsdata => {

                            if (prj.title == qrsdata.project && (qrsdata.type == 'Reclamo' || qrsdata.type == 'Quejas')) {
                                cont++
                                console.log("heeeey", prj.title, qrsdata.project)
                                info.push(qrsdata)
                            }

                        })
                        let objData = {
                            id: prj._id,
                            name: prj.title,
                            type: 'Reclamo',
                            number: cont,
                            info: info

                        }
                        arrReqStatus.push(objData)
                        info = []
                        cont = 0;
                    })
                    return res.status(200).send({
                        status: 'success',
                        reqStatus: arrReqStatus,

                    })

                })




            })



        })

    },
    obtainReqProjectQRSS: function (req, res) {

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }



            let arrReqStatus = [];
            let qrsT = ['Queja', 'Reclamo', 'Sugerencia']
            let cont = 0;

            let objT = {}

            Qrs.find().exec((err, qrs) => {
                if (err || !qrs) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay usuarios que mostrar'
                    })
                }


                Project.find().exec((err, prj) => {
                    if (err || !prj) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No hay proyectos que mostrar'
                        })
                    }
                    let info = []
                    prj.forEach(prj => {
                        qrs.forEach(qrsdata => {

                            if (prj.title == qrsdata.project && qrsdata.type == 'Sugerencia') {
                                cont++
                                console.log("heeeey", prj.title, qrsdata.project)
                                info.push(qrsdata)
                            }

                        })
                        let objData = {
                            id: prj._id,
                            name: prj.title,
                            type: 'Sugerencia',
                            number: cont,
                            info: info

                        }
                        arrReqStatus.push(objData)
                        info = []
                        cont = 0;
                    })
                    return res.status(200).send({
                        status: 'success',
                        reqStatus: arrReqStatus,

                    })

                })




            })



        })

    },
    obtainInfoQRS: function (req, res) {

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado




        let arrReqStatus = [];
        let qrsT = [{ name: 'Queja' }, { name: 'Reclamo' }, { name: 'Sugerencia' }]
        let cont = 0;

        let objT = {}

        Qrs.find().exec((err, qrs) => {
            if (err || !qrs) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay usuarios que mostrar'
                })
            }



            qrsT.forEach(q => {


                qrs.forEach(reqrs => {
                    console.log("solicitud", reqrs.type)

                    if (reqrs.type == q.name) {
                        cont++
                    }
                })
                let obj = {
                    name: q.name,
                    cont: cont
                }
                cont = 0
                arrReqStatus.push(obj)

            })

            return res.status(200).send({
                status: 'success',
                reqStatus: arrReqStatus,

            })






        })




    },
    obtainInfo: function (req, res) {

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado




        let arrReqStatus = [];
        let qrsT = [{ name: 'Queja' }, { name: 'Reclamo' }, { name: 'Sugerencia' }]
        let cont = 0;

        let objT = {}

        Qrs.find().exec((err, qrs) => {
            if (err || !qrs) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay usuarios que mostrar'
                })
            }



            qrsT.forEach(q => {


                qrs.forEach(reqrs => {
                    console.log("solicitud", reqrs.type)

                    if (reqrs.type == q.name) {
                        cont++
                    }
                })
                let obj = {
                    name: q.name,
                    cont: cont
                }
                cont = 0
                arrReqStatus.push(obj)

            })

            return res.status(200).send({
                status: 'success',
                reqStatus: arrReqStatus,

            })






        })




    },
    //Charts user
    obtainUser: function (req, res) {

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        var userId = req.params.id

        Request.find({
            user: userId
        })
            .exec((err, req) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al hacer la consulta'
                    })
                }
                if (!req) {
                    return res.status(404).send({
                        status: 'notfound',
                        message: 'No hay solicitudes'
                    })
                }
                console.log("req--->", req)
                let i = 1;
                let months = 13;
                let cont = 0;
                let arrReqMont = [];

                for (i = 1; i < months; i++) {

                    req.forEach(element => {
                        const month = element.date.getMonth() + 1;
                        console.log(i, month)
                        if (i == month) {
                            cont++
                        }
                    });
                    arrReqMont.push(cont)
                    cont = 0;

                }
                let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']

                return res.status(200).send({
                    status: 'success',
                    data: {
                        labels: arrM,
                        series: arrReqMont
                    },

                })

            })

    },
    obtainReqStatusUser: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado
        var userId = req.params.id

        Request.find({
            user: userId
        })
            .exec((err, req) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al hacer la consulta'
                    })
                }
                if (!req) {
                    return res.status(404).send({
                        status: 'notfound',
                        message: 'No hay solicitudes'
                    })
                }



                let arrReqStatus = [];
                let status = ['Created', 'Review', 'Rejected', 'Approved']
                let cont = 0;


                status.forEach(e => {
                    console.log(e)
                    req.forEach(element => {
                        console.log(e, element.status)

                        if (e == element.status) {
                            cont++;
                        }
                    })

                    let obj = {
                        status: e,
                        cont: cont
                    }

                    arrReqStatus.push(obj)
                    cont = 0
                })

                return res.status(200).send({
                    status: 'success',
                    reqStatusUser: arrReqStatus,

                })

            })


    },
    obtainReqStatusMonthActuallyCUser: function (req, res) {


        var userId = req.params.id

        Request.find({
            user: userId
        })
            .exec((err, req) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al hacer la consulta'
                    })
                }
                if (!req) {
                    return res.status(404).send({
                        status: 'notfound',
                        message: 'No hay solicitudes'
                    })
                }



                let arrReqStatus = [];
                let status = ['Created']
                let cont = 0;
                let today = new Date()

                status.forEach(e => {
                    console.log(e)
                    req.forEach(element => {

                        if ((e == element.status) && (element.date.getMonth() + 1 == today.getMonth() + 1)) {
                            cont++;
                            console.log("here", cont)
                        }
                    })

                    let obj = {
                        status: e,
                        cont: cont
                    }

                    arrReqStatus.push(obj)
                    cont = 0
                })

                return res.status(200).send({
                    status: 'success',
                    reqStatus: arrReqStatus,

                })

            })


    },
    obtainReqStatusMonthActuallyRUser: function (req, res) {



        var userId = req.params.id

        Request.find({
            user: userId
        })
            .exec((err, req) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al hacer la consulta'
                    })
                }
                if (!req) {
                    return res.status(404).send({
                        status: 'notfound',
                        message: 'No hay solicitudes'
                    })
                }



                let arrReqStatus = [];
                let status = ['Rejected']
                let cont = 0;
                let today = new Date()

                status.forEach(e => {
                    console.log(e)
                    req.forEach(element => {

                        if ((e == element.status) && (element.date.getMonth() + 1 == today.getMonth() + 1)) {
                            cont++;
                            console.log("here", cont)
                        }
                    })

                    let obj = {
                        status: e,
                        cont: cont
                    }

                    arrReqStatus.push(obj)
                    cont = 0
                })
                return res.status(200).send({
                    status: 'success',
                    reqStatus: arrReqStatus,

                })

            })


    },
    obtainReqStatusMonthActuallyAUser: function (req, res) {

        //Find paginado
        var userId = req.params.id

        Request.find({
            user: userId
        })
            .exec((err, req) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al hacer la consulta'
                    })
                }
                if (!req) {
                    return res.status(404).send({
                        status: 'notfound',
                        message: 'No hay solicitudes'
                    })
                }



                let arrReqStatus = [];
                let status = ['Approved']
                let cont = 0;
                let today = new Date()

                status.forEach(e => {
                    console.log(e)
                    req.forEach(element => {

                        if ((e == element.status) && (element.date.getMonth() + 1 == today.getMonth() + 1)) {
                            cont++;
                            console.log("here", cont)
                        }
                    })

                    let obj = {
                        status: e,
                        cont: cont
                    }

                    arrReqStatus.push(obj)
                    cont = 0
                })
                return res.status(200).send({
                    status: 'success',
                    reqStatus: arrReqStatus,

                })

            })


    },
    obtainReqProjectStatusUser: function (req, res) {

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }

        let arrReqStatus = [];
        Project.paginate({}, options, (err, prj) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!prj) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }




            let status = ['Approved']
            let cont = 0;
            let today = new Date()

            var userId = req.params.id

            Request.find({
                user: userId
            })
                .exec((err, req) => {
                    if (err || !req) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No hay usuarios que mostrar'
                        })
                    }

                    prj.docs.forEach(prj => {

                        console.log("prj", prj.title)

                        req.forEach(req => {
                            console.log("req", req.project)

                            if (prj.title == req.project && req.status == 'Created') {
                                cont++
                            }
                        })

                        let obj = {

                            name: prj.title,
                            cont: cont,
                            status: 'Created'
                        }
                        arrReqStatus.push(obj)
                        cont = 0;
                    })



                    return res.status(200).send({
                        status: 'success',
                        reqStatus: arrReqStatus,

                    })

                })



        })








    },
    obtainReqProjectQRSUser: function (req, res) {

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado
    


                let arrReqStatus = [];
                let qrsT = ['Queja', 'Reclamo', 'Sugerencia']
                let cont = 0;

                let objT = {}

                var userId = req.params.id
                Qrs.find({
                    user: userId
                })
                    .exec((err, qrs) => {
                        console.log("reclamos", qrs)
                    if (err || !qrs) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No hay usuarios que mostrar'
                        })
                    }


                    Project.find().exec((err, prj) => {
                        if (err || !prj) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'No hay proyectos que mostrar'
                            })
                        }
                        let info = []
                        prj.forEach(prj => {
                            qrs.forEach(qrsdata => {

                                if (prj.title == qrsdata.project && (qrsdata.type == 'Reclamo' || qrsdata.type == 'Quejas')) {
                                    cont++
                                    console.log("heeeey", prj.title, qrsdata.project)
                                    info.push(qrsdata)
                                }

                            })
                            let objData = {
                                id: prj._id,
                                name: prj.title,
                                type: 'Reclamo',
                                number: cont,
                                info: info

                            }
                            arrReqStatus.push(objData)
                            info = []
                            cont = 0;
                        })
                        return res.status(200).send({
                            status: 'success',
                            reqStatus: arrReqStatus,

                        })

                    })




                })



            

    },
    obtainReqProjectQRSSUser: function (req, res) {

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        //Find paginado
      
     


                let arrReqStatus = [];
                let qrsT = ['Queja', 'Reclamo', 'Sugerencia']
                let cont = 0;

                let objT = {}

                var userId = req.params.id
                Qrs.find({
                    user: userId
                })
                    .exec((err, qrs) => {
                    if (err || !qrs) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No hay usuarios que mostrar'
                        })
                    }


                    Project.find().exec((err, prj) => {
                        if (err || !prj) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'No hay proyectos que mostrar'
                            })
                        }
                        let info = []
                        prj.forEach(prj => {
                            qrs.forEach(qrsdata => {

                                if (prj.title == qrsdata.project && qrsdata.type == 'Sugerencia') {
                                    cont++
                                    console.log("heeeey", prj.title, qrsdata.project)
                                    info.push(qrsdata)
                                }

                            })
                            let objData = {
                                id: prj._id,
                                name: prj.title,
                                type: 'Sugerencia',
                                number: cont,
                                info: info

                            }
                            arrReqStatus.push(objData)
                            info = []
                            cont = 0;
                        })
                        return res.status(200).send({
                            status: 'success',
                            reqStatus: arrReqStatus,

                        })

                    })




                })



     

    },
    obtainInfoQRSUser: function (req, res) {

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado




        let arrReqStatus = [];
        let qrsT = [{ name: 'Queja' }, { name: 'Reclamo' }, { name: 'Sugerencia' }]
        let cont = 0;

        let objT = {}
        //Find paginado
        var userId = req.params.id
        Qrs.find({
            user: userId
        })
            .exec((err, qrs) => {

                if (err || !qrs) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay usuarios que mostrar'
                    })
                }



                qrsT.forEach(q => {


                    qrs.forEach(reqrs => {
                        console.log("solicitud", reqrs.type)

                        if (reqrs.type == q.name) {
                            cont++
                        }
                    })
                    let obj = {
                        name: q.name,
                        cont: cont
                    }
                    cont = 0
                    arrReqStatus.push(obj)

                })

                return res.status(200).send({
                    status: 'success',
                    reqStatus: arrReqStatus,

                })






            })




    },
    obtainQRSAllUsers: function (req, res) {

console.log("hereeeee")
        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Qrs.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }

            let i = 1;
            let months = 13;
            let cont = 0;
            let arrReqMont = [];

            for (i = 1; i < months; i++) {

                qrs.docs.forEach(element => {
                    const month = element.date.getMonth() + 1;
                    console.log(i, month, element)
                        if (i == month) {
                            if(element.type== 'Reclamo'){
                                cont++
                            }
                        }
                });
                let obj = {
                    month: i,
                    reqs: cont
                }
                arrReqMont.push(cont)
                cont = 0;

            }
            let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']

            return res.status(200).send({
                status: 'success',
                data: {
                    labels: arrM,
                    series: arrReqMont
                },

            })

        })


    },
    obtainQRSAllUser: function (req, res) {

        console.log("hereeeee")
                //Cargar la libreria de la paginación en la clase
        
                //Recoger la página actual
        
                if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
                    var page = 1
                } else {
                    var page = parseInt(req.params.page);
                }
        
                var options = {
                    sort: { date: -1 },
                    populate: 'user',
                    limit: 10,
                    page: page
                }
                //Indicar las opciones de paginación
        
                var userId = req.params.id
                Qrs.find({
                    user: userId
                })
                    .exec((err, qrs) => {
        
                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al hacer la consulta'
                        })
                    }
                    if (!qrs) {
                        return res.status(404).send({
                            status: 'notfound',
                            message: 'No hay solicitudes'
                        })
                    }
        
                    let i = 1;
                    let months = 13;
                    let cont = 0;
                    let arrReqMont = [];
        
                    for (i = 1; i < months; i++) {
        
                        qrs.forEach(element => {
                            const month = element.date.getMonth() + 1;
                            console.log(i, month, element.type)
                                if (i == month) {
                                    if(element.type== 'Reclamo'){
                                        cont++
                                    }
                                    
                                }
                        });
                        let obj = {
                            month: i,
                            reqs: cont
                        }
                        arrReqMont.push(cont)
                        cont = 0;
        
                    }
                    let arrM = ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De']
        
                    return res.status(200).send({
                        status: 'success',
                        data: {
                            labels: arrM,
                            series: arrReqMont
                        },
        
                    })
        
                })
        
        
            },
}
module.exports = controller