const express = require('express');

const addNewCollection = require('../queries/addNewCollection');
const checkIfUserExists = require('../queries/checkIfUserExists');
const checkIfCollectionExists = require('../queries/checkIfCollectionExists');
const checkIfRecommendationExistsForUser = require('../queries/checkIfRecommendationExistsForUser');
const addRecommendationToCollection = require('../queries/addRecommendationToCollection');
const checkIfRecommendationExistsInCollection = require('../queries/checkIfRecommendationExistsInCollection');
const checkIfCollectionExistsForUser = require('../queries/checkIfCollectionExistsForUser');
const removeRecommendationFromCollection = require('../queries/removeRecommendationFromCollection');
const checkIfAnyCollectionExistsForUser = require('../queries/checkIfAnyCollectionExistsForUser');
const getAllCollectionsOfAUser = require('../queries/getAllCollectionsOfAUser');
const removeCollection = require('../queries/removeCollection');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { name, description, user_id } = req.body;
        if (!name || !description || !user_id)
            res.status(403).send({
                success: false,
                err: 'All fields not provided!'
            });
        else {
            const x = await checkIfUserExists({ userId: user_id });
            if (x.success) {
                const y = await addNewCollection({ name, description, userId: user_id });
                if (y.success)
                    res.status(200).send({
                        success: true
                    });
                else
                    res.status(404).send({
                        success: false,
                        err: y.err
                    });
            }
            else {
                if (x.err)
                    res.status(500).send(x);
                else
                    res.status(403).send({
                        success: false,
                        err: 'No such user exists!'
                    });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err: err
        });
    }
});

router.post('/addRecommendation', async (req, res) => {
    try {
        const { collection_id, user_id, recommendation_id } = req.body;
        if (!collection_id || !user_id || !recommendation_id)
            res.status(403).send({
                success: false,
                err: 'All fields not provided!'
            });
        else {
            const x = await checkIfUserExists({ userId: user_id });
            if (x.success) {
                const y = await checkIfRecommendationExistsForUser({ userId: user_id, recommendationId: recommendation_id });
                if (y.success) {
                    const z = await checkIfCollectionExistsForUser({ userId: user_id, collectionId: collection_id });
                    if (z.success) {
                        const a = await addRecommendationToCollection({ userId: user_id, collectionId: collection_id, recommendationId: recommendation_id });
                        if (a.success)
                            res.status(200).send({
                                success: true
                            });
                        else
                            res.status(500).send(a);
                    }
                    else {
                        if (z.err)
                            res.status(500).send(z);
                        else
                            res.status(403).send({
                                success: false,
                                err: 'No such collection exists!'
                            });
                    }
                }
                else {
                    if (y.err)
                        res.status(500).send(y);
                    else
                        res.status(403).send({
                            success: false,
                            err: 'No recommendation exists for this user!'
                        });
                }
            }
            else {
                if (x.err)
                    res.status(500).send(x);
                else
                    res.status(403).send({
                        success: false,
                        err: 'No such user exists!'
                    });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err: err
        });
    }
});

router.put('/removeRecommendation', async (req, res) => {
    try {
        const { collection_id, recommendation_id } = req.body;
        if (!collection_id || !recommendation_id)
            res.status(403).send({
                success: false,
                err: 'All fields not provided!'
            });
        else {
            const x = await checkIfCollectionExists({ collectionId: collection_id });
            if (x.success) {
                const y = await checkIfRecommendationExistsInCollection({ collectionId: collection_id, recommendationId: recommendation_id });
                if (y.success) {
                    const z = await removeRecommendationFromCollection({ collectionId: collection_id, recommendationId: recommendation_id });
                    if (z.success)
                        res.status(200).send({
                            success: true
                        });
                    else
                        res.status(500).send(z);
                }
                else {
                    if (y.err)
                        res.status(500).send(y);
                    else
                        res.status(403).send({
                            success: false,
                            err: 'No such recommendation exists for this collection!'
                        });
                }
            }
            else {
                if (x.err)
                    res.status(500).send(x);
                else
                    res.status(403).send({
                        success: false,
                        err: 'No such collection exists!'
                    });
            }
        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            err: 'Internal server error!'
        });
    }
});

router.get('/view', async (req, res) => {
    try {
        const userId = parseInt(req.query.user_id);
        if (isNaN(userId))
            res.status(403).send({
                success: false,
                err: 'Invalid user id'
            });
        else {
            const x = await checkIfAnyCollectionExistsForUser({ userId });
            if (x.success) {
                const y = await getAllCollectionsOfAUser({ userId });
                if (y.success)
                    res.status(200).send({
                        success: true,
                        collections: y.collections
                    });
                else
                    res.status(500).send(y);
            }
            else {
                if (x.err)
                    res.status(500).send(x);
                else
                    res.status(403).send({
                        success: false,
                        err: 'No collections exist for this user!'
                    });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err: 'Internal server error!'
        });
    }
});

router.delete('/remove', async (req, res) => {
    try {
        const { collection_id } = req.body;
        const x = await checkIfCollectionExists({ collectionId: collection_id });
        if (x.success) {
            const y = await removeCollection({ collectionId: collection_id });
            if (y.success)
                res.status(200).send({
                    success: true
                });
            else
                res.status(500).send(y);
        }
        else {
            if (x.err)
                res.status(500).send(x);
            else
                res.status(403).send({
                    success: false,
                    err: 'No such collection exists!'
                });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err: 'Internal server error!'
        });
    }
});

module.exports = router;