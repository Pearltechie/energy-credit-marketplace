(define-map energy-credits
  { credit-id: uint }
  { producer: principal, consumer: (optional principal), amount: uint, redeemed: bool })

(define-data-var next-credit-id uint u1)

(define-public (issue-credit (amount uint))
  (begin
    (let ((credit-id (var-get next-credit-id)))
      (map-set energy-credits
        { credit-id: credit-id }
        { producer: tx-sender, consumer: none, amount: amount, redeemed: false })
      (var-set next-credit-id (+ credit-id u1))
      (ok credit-id)
    )
  )
)

(define-public (transfer-credit (credit-id uint) (new-consumer principal))
  (begin
    (match (map-get energy-credits { credit-id: credit-id })
      credit-data
      (begin
        (asserts! (is-none (get consumer credit-data)) (err u100)) ;; Credit already transferred
        (asserts! (is-eq (get producer credit-data) tx-sender) (err u101)) ;; Not the producer
        (map-set energy-credits
          { credit-id: credit-id }
          { producer: (get producer credit-data), consumer: (some new-consumer), amount: (get amount credit-data), redeemed: (get redeemed credit-data) })
        (ok true)
      )
      (err u102) ;; Credit not found
    )
  )
)

(define-public (redeem-credit (credit-id uint))
  (begin
    (match (map-get energy-credits { credit-id: credit-id })
      credit-data
      (begin
        (asserts! (is-eq (get consumer credit-data) (some tx-sender)) (err u103)) ;; Not the owner
        (asserts! (not (get redeemed credit-data)) (err u104)) ;; Already redeemed
        (map-set energy-credits
          { credit-id: credit-id }
          { producer: (get producer credit-data), consumer: (get consumer credit-data), amount: (get amount credit-data), redeemed: true })
        (ok true)
      )
      (err u102) ;; Credit not found
    )
  )
)

(define-read-only (get-credit-details (credit-id uint))
  (begin
    (match (map-get energy-credits { credit-id: credit-id })
      credit-data
      (ok credit-data)
      (err u102) ;; Credit not found
    )
  )
)

(define-read-only (get-all-credits)
  (map
    (lambda (entry)
      (ok entry))
    (list (map-entries energy-credits))
  )
)
